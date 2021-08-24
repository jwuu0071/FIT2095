let express = require('express');
let router = express.Router();
let db = [];

router.get('/',function (req,res){
    res.send("Welcome to my book store");
});

router.get('/addbook', function (req,res){
    let newBook = {
        bookId: Math.round(Math.random()*1000),
        bookTitle: req.query.title,
        bookAuthor: req.query.author,
        bookTopic: req.query.topic,
        bookCost: req.query.cost
    };
    db.push(newBook);
    res.send("you added an new book which id is " + newBook.bookId);
});

router.get('/getallbooks',function (req,res){
    res.send(generateList())
});

router.get('/deleteid/:id', function (req,res){
    db.forEach(function (item,index,arr){
        if(item.bookId == req.params.id){
            arr.splice(index,1);
        }
    });
    res.send(generateList());

});

router.get('/deletetopic/:topicname',function (req,res){
    db = db.filter(function (item){
        return item.bookTopic != req.params.topicname
    });
    res.send(generateList());
})

router.get('/getbookstorevalue',function (req,res){
    res.send("The total value of bookstore is " + sum());
})

function generateList(){
    let st = "";
    for (let i = 0;i<db.length;i++){
        st += db[i].bookId+" | "+db[i].bookTitle+" | "+db[i].bookAuthor+" | "+db[i].bookTopic+ " | " +db[i].bookCost+"</br>";
    }
    return st;
};

function sum(){
    let r = 0;
    for (let i = 0;i<db.length;i++){
        r += Number(db[i].bookCost);
    }
    return r
};

module.exports = router;