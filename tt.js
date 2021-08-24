// const express = require("express");
// const app = express();
//
// // your code goes here
// app.set('unitCode', 'FIT2095');
// app.set('WeekNumber', 4);
//
// app.get("/", function (req, res) {
//     res.send(
//         `The unit code is ${req.unitCode}  and we are in week ${req.weekNumber}`
//     );
// });
// app.listen(8080);

// action: Send form data somewhere
// method: The method attribute specifies how to send form data



const express = require("express");
const app = express();

// your code goes here
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

app.use(function (req, res, next) {
    req.unitCode = "FIT2095";
    req.weekNumber = 4;
    next();
});
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

//your code here

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

// your code here
let num1,num2;
app.post("/findmax",function (req,res){
    num1 = parseInt(req.body.value1)
    num2 = parseInt(req.body.value2)
    if(num1>=num2){
        res.render("response.html",{maxValue:num1})
    }
    else{
        res.render("response.html",{maxValue:num2})
    }


})

app.listen(8080);