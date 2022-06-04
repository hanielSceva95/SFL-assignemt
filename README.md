# SFL-assignemt
SFL Scientific Assignment - Front End Developer role

Frontend - Angular13, Backend - NodeJs, Database - MySQL

In the project I have used MySQL RDB in order to handle the given data sets. If MysSQL is already installed you can follow the below command to start the server and create new database and table.

Setting Up MySQL server  
Command to run the MySQL server (if .bash_profile already exists with export value) 
mysql -u root -p 
After entering credentials command to create new SFL Database
CREATE DATABASE SFL;
Command to use SFL database
USE SFL
Command to Create new Table
	CREATE TABLE IF NOT EXISTS STORES_DATA(STORE_ID INT(10) PRIMARY KEY , LATITUDE DECIMAL(10,8), LONGITUDE DECIMAL(11,8), DAYS_OPEN INT(10) NOT NULL, ITEM_AVAILABILITY VARCHAR(255), ZONE VARCHAR(255));

Setting backend (NodeJS)
After Installing Node package manger and run the below command in backend folder
npm install
To start the node server run the below command which starts nodemon
npm start
Backend server is running at http://localhost:3000

Setting Up frontend (Angular)
After installing angular run the below command in frontend folder
npm install
To start angular server run
ng serve
You can find the app running at http://localhost:4200/

Packages used at backend:
Express : Middleware to add support for cookies, sessions, and users, getting POST/GET parameters
BodyParser : Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
MySQL : For creating connection with the MySQL database
Fastcsv : Library for parsing and formatting CSVs or any other delimited value file in node.
Multer : Middleware for handling multipart/form-data. Used for importing files from front end and saving them at backend in upload folder.

Packages used at frontend:
HttpClientModule :  To perform http calls
MatTable : To display the filtered data in neat table format.
AngularForms : To handle input data as the user enters it.
GoogelMaps : After fetching the data in order to display the stores in maps  
 Mat-table-exporter : To download the filter data into a .csv file
Bootstrap-scss: For implementing predefined css in the angular project.


Features:
The user can upload a .csv file using the Upload File button, which converts the data in .csv file and inserts it into the STORES_DATA table in SFL database.
While uploading the .csv file if the data present in database is identical to the data present in .csv file, the old data gets overwritten and new data gets inserted into the database.
If an error occurs while adding new data through .csv file, there is a rollback function to handle the loss of existing data.
There are 2 filter options available. User can filter with items available, zone and the days the store is open. 
This filter can be used in any combination as none of those fields are mandatory. 
On hitting submit the filtered data is displayed in filtered data section.
User can also filter with respect to latitude and longitude to fetch the store details which are the closest to mentioned coordinated.
This submit button is disabled until the user enters all the fields (i.e., latitude, longitude, number of stores)
User can download this filtered information into a .csv file.
On clicking on the View on map icon the user is forward to maps page where the store is marked with a marker. 
On hover the store details are displayed into the information block.
As the user zooms out depending on the boundaries of the map, other stores which are present in the given dataset will also be marked using a marker.
