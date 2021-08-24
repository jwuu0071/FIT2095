let express = require("express");
let app = express();

app.get('/week3/marks/:prerqmark/:wsqmark/:labmark',function(req,res){
    prerq = req.params.prerqmark;
    wsq = req.params.wsqmark;
    lab = req.params.labmark;
    noFinalMark = weekMark(prerq,wsq,lab)
    res.send("Week3 Mark is "+ noFinalMark);
});

app.get('/week3*',function(req,res){
    res.send("Welcome to week 3")
});

app.get('/',function(req,res){
    res.send("Welcome to FIT2095")
});

app.listen(8080);

function weekMark(prerq,wsq,lab){

    return prerq*0.1+wsq*0.1+lab*0.2;

};
