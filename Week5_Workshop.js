/* Q1
1. A document is a data structure composed of field and value pairs. MongoDB documents are similar to JSON objects.
A collection is like a table in a relational database. It is a set of documents, and you access each document via the collection.
Each document stored in a collection requires a unique _id field that acts as a primary key.The values of fields may include other documents, arrays, and arrays of documents.

2. Compared to a JSON object, a MongoDB document has support not only for the primitive data types boolean, numbers, and strings, but also other common data types such as dates, timestamps, regular expressions, and binary data.
*/

/*
1. let query = {airline:'VA'}
db.collection("flights").find(query).limit(10)

2. let query = { from: { $in: ['SYD', 'SA'] } , to: { $in: ['SYD', 'SA'] }};
let sortBy={cost:-1}
db.collection("flights").find(query).sort(sortBy).toArray(function (err, result) {});

3. let query = { from: { $in: ['SYD', 'NT'] },to: { $in: ['SYD', 'NT'] }};
db.collection("flights").updateMany(query, {$mul:{cost:2}}, {upsert:false}, function(err,result){})

4. db.collection("flights").deleteMany({cost:{$lt:300}}, function(err,obj){});
*/

const express = require("express");
const mongodb = require("mongodb");
//Configure Express
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const MongoClient = mongodb.MongoClient;
const url = "mongodb://10.152.168.99:27017/";
let db;

MongoClient.connect(url, { useNewUrlParser: true }, function (err, client) {
    if (err) {
        console.log("Err  ", err);
    } else {
        console.log("Connected successfully to server");
        db = client.db("agency");
    }
});

app.post("/postbooking",function (req,res){
    let bookDetails = req.body;
    db.collection("booking").insertOne({
        source:bookDetails.source,
        target:bookDetails.target,
        airline:bookDetails.airline
    });
    res.end("New record inserted successfully");
})

app.listen(68153);
