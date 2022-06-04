const mysql = require("mysql");
const config = require("../config/config.json");
const converter = require("json-2-csv");

// Connection pool
const pool = mysql.createPool({
  connectionLimit: 100,
  host: config.host,
  user: config.user,
  database: config.database,
  password: config.password,
});

//fetching specific store dedtails

exports.view = (req, res) => {
  // connection to DB
  pool.getConnection((err, connection) => {
    if (err) throw err; //not connected
    console.log("Connected as ID " + connection.threadId);
    //query with reqpect to store_id
    connection.query(
      "SELECT * FROM STORES_DATA WHERE STORE_ID = ?",
      [req.params.id],
      (err, rows) => {
        //when done with connection, release it
        connection.release();

        if (!err) {
          res.send(rows);
        } else {
          console.log(err);
        }
      }
    );
  });
};

//filter with days open, item availability, zone

exports.find = (req, res) => {
  // connection to DB
  pool.getConnection((err, connection) => {
    if (err) throw err; //not connected
    console.log("Connected as ID " + connection.threadId);
    let daysOpenParameters = req.body.daysOpen;
    let itemAvailabilityParameters = req.body.availabilityCount;
    let zoneParameters = req.body.zone;

    //querying with filter requet while ignoring empty strings and white spaces
    connection.query(
      "SELECT STORE_ID, LATITUDE, LONGITUDE FROM STORES_DATA WHERE 1 = case when coalesce(trim(?), '') = '' then 1 else (DAYS_OPEN = ?) end and 1 = case when coalesce(trim(?), '') = '' then 1 else (ZONE = trim(?)) end and 1 = case when coalesce(trim(?), '') = '' then 1 else (ITEM_AVAILABILITY = ?) end",
      [
        daysOpenParameters,
        daysOpenParameters,
        zoneParameters,
        zoneParameters,
        itemAvailabilityParameters,
        itemAvailabilityParameters,
      ],
      (err, rows) => {
        //when done with connection, release it
        connection.release();

        if (!err) {
          console.log(rows.length);
          res.send(rows);
        } else {
          console.log(err);
        }
      }
    );
  });
};

//filter with lat and long
exports.fetchLLData = (req, res) => {
  // connection to DB
  pool.getConnection((err, connection) => {
    if (err) throw err; //not connected
    console.log("Connected as ID " + connection.threadId);
    let latitudeParameters = Number(req.body.latitude);
    let longitudeParameters = Number(req.body.longitude);
    let closestParameters = Number(req.body.closest);

    //querying with lat and long coordinates
    connection.query(
      "SELECT DISTINCT(STORE_ID), LATITUDE, LONGITUDE, ( 3959 * acos( cos( radians(?) ) * cos( radians( latitude) ) * cos( radians( longitude ) - radians(?) ) + sin( radians(?) ) * sin( radians( latitude ) ) ) ) AS distance FROM STORES_DATA HAVING distance < 25 ORDER BY distance LIMIT 0 , ?",
      [
        latitudeParameters,
        longitudeParameters,
        latitudeParameters,
        closestParameters,
      ],
      (err, rows) => {
        //when done with connection, release it
        connection.release();

        if (!err) {
          res.send(rows);
        } else {
          console.log(err);
        }
      }
    );
  });
};

//filter with days open
exports.fetchZoomData = (req, res) => {
  // connection to DB
  pool.getConnection((err, connection) => {
    if (err) throw err; //not connected
    console.log("Connected as ID " + connection.threadId);
    let a = req.body[0].a;
    let b = req.body[0].b;
    let c = req.body[0].c;
    let d = req.body[0].d;
    console.log(a, b, c, d);
    //querying with zoom filter requet
    connection.query(
      "SELECT DISTINCT(STORE_ID), LATITUDE, LONGITUDE FROM STORES_DATA WHERE (CASE WHEN ? < ? THEN LATITUDE BETWEEN ? AND ? ELSE LATITUDE BETWEEN ? AND ? END) AND (CASE WHEN ? < ? THEN LONGITUDE BETWEEN ? AND ? ELSE LONGITUDE BETWEEN ? AND ? END) ",
      [a, c, a, c, c, a, b, d, b, d, d, b],
      (err, rows) => {
        //when done with connection, release it
        connection.release();
        if (!err) {
          console.log(rows.length);
          res.send(rows);
        } else {
          console.log(err);
        }
      }
    );
  });
};
