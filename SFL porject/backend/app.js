const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const ports = process.env.port || 3000;
const fs = require("fs");
const mysql = require("mysql");
const fastcsv = require("fast-csv");
const multer = require("multer");

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// uploading files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage });
app.post("/file", upload.single("file"), (req, res) => {
  const file = req.file;
  if (file) {
    res.json(file);
    let stream = fs.createReadStream("./uploads/" + file.filename);
    let csvData = [];
    let csvStream = fastcsv
      .parse()
      .on("data", function (data) {
        csvData.push(data);
      })
      .on("end", function () {
        // remove the first line: header
        csvData.shift();
        // create a new connection to the database
        const connection = mysql.createConnection({
          host: "localhost",
          user: "root",
          password: "Shiva143786",
          database: "SFL",
        });
        // open the connection
        connection.connect((error) => {
          if (error) {
            console.error(error);
          } else {
            //query to insert new data and replace old data with new data
            let query =
              "INSERT INTO STORES_DATA (STORE_ID, LATITUDE, LONGITUDE, DAYS_OPEN, ITEM_AVAILABILITY, ZONE) VALUES ? ON DUPLICATE KEY UPDATE LATITUDE=values(LATITUDE), LONGITUDE=values(LONGITUDE), DAYS_OPEN=values(DAYS_OPEN), ITEM_AVAILABILITY=values(ITEM_AVAILABILITY), ZONE=values(ZONE)";
            connection.query(query, [csvData], (error, response) => {
              if (error) {
                //rollback function to hanlde errors
                connection.rollback();
              } else {
                console.log("Data Successfully Inserted", response);
              }
            });
          }
        });
      });
    stream.pipe(csvStream);
  } else {
    throw new Error("file not found");
  }
});

// Forwarding all routes
const routes = require("./routes/stores");
app.use("/", routes);

app.listen(ports, () => console.log(`listening on port ${ports}`));
