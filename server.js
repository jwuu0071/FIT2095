//Import packages
const express = require("express");
const mongodb = require("mongodb");
//Configure Express
const app = express();
app.set("view engine", "html");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.listen(8080);
//Configure MongoDB
const MongoClient = mongodb.MongoClient;
// Connection URL
const url = "mongodb://localhost:27017/";
//reference to the database (i.e. collection)
let db;

MongoClient.connect("mongodb://localhost:8080/", function (err, client) {
    if (err) {
        console.log('Err ', err);
    } else {
        console.log("Connected successfully to server");
        db = client.db('warehouse');
    }
});