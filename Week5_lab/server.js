let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let mongodb = require('mongodb');

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

let db;
const MongoClient = mongodb.MongoClient;
const url = 'mongodb://localhost:27017/';
MongoClient.connect(url, {useNewUrlParser: true}, function (err, client) {
    if (err) {
        console.log('Err  ', err);
    } else {
        console.log("Connected successfully to server");
        db = client.db('bookstore');
    }
});

app.use(express.static('images'));
app.use(express.static('css'));
app.use(express.urlencoded({extended: true}));
// parse application/json
app.use(express.json())
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.render('index.html')
});

app.get('/newbook', function (req, res) {
    res.render('newbook.html');
});

app.post('/newbook',function (req,res){
    let bookdetails = req.body
    db.collection("bookstore").insertOne({
        title: bookdetails.bookTitle,
        author: bookdetails.bookAuthor,
        topic: bookdetails.bookTopic,
        date: bookdetails.bookDate,
        summary: bookdetails.summary
    });
    res.redirect('listbook');
})

app.get('/listbook', function (req, res) {
    db.collection("bookstore").find({}).toArray(function (err,data){
        res.render("listbook.html",{bookDb: data})
    })
});

app.get("/deletebook", function (req,res){
    res.render("deletebook.html")
})

app.post("/deletebookdata", function (req,res){
    let bookdetails = req.body;
    db.collection("bookstore").deleteMany({topic:{ $eq: bookdetails.bookTopic }});
    res.redirect("/listbook")
})

app.get('/updatebook', function (req,res){
    res.render("updatebook.html")
})

app.post('/updatebookdata',function (req,res){
    let bookdetails = req.body;
    let filter = {title:bookdetails.bookoldTitle}
    let theUpdate = {$set:{title:bookdetails.booknewTitle,
            author:bookdetails.bookAuthor,
            topic:bookdetails.bookTopic,
            date:bookdetails.bookDate,
            summary:bookdetails.summary}}
    db.collection("bookstore").updateMany(filter, theUpdate, {upsert:false},function (err,result){})
    res.redirect("/listbook");
})

app.get('/*',function (req,res){
    res.render('error.html');
})




app.listen(8080);