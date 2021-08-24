let express = require('express');
let app = express();
let bodyParser = require('body-parser');

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(express.static('images'));
app.use(express.static('css'));
app.use(express.urlencoded({extended: true}));
// parse application/json
app.use(express.json())

let db = [];

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
    if(req.body.bookAuthor.length<3 || req.body.bookTitle.length<3 || req.body.bookTopic<3 || req.body.bookCost<=0){
        res.render('invalid.html');
    }
    else{
        db.push({title:req.body.bookTitle,
                author: req.body.bookAuthor,
                topic: req.body.bookTopic,
                cost: req.body.bookCost});
        res.render('newbook.html');

    }
})

app.get('/listbook', function (req, res) {
    res.render('listbook.html',{bookDb: db});
});

app.get('/searchbook',function (req,res){
    authorDb = []
    for ( let i =0; i< db.length;i++) {
        if (db[i].author.search(req.query.author) !== -1) {
            authorDb.push(i);
        }
    }
    res.render('searchbook.html', {authorDb:  authorDb, bookDb: db})
});

app.get('/*',function (req,res){
    res.render('error.html');
})



app.listen(8080);