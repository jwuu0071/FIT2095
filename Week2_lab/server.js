let http = require('http');
let fs = require('fs');


http.createServer(function (request, response) {
    let baseURL = "http://" + request.headers.host + "/";
    let url = new URL(request.url, baseURL);
    let pathName = url.pathname;

    switch (pathName) {
        case '/':
            sendFile('index.html', 200, response);
            break;
        case '/assessments':
            sendFile('assessments.html', 200, response);
            break;
        case '/topics':
            sendFile('topics.html', 200, response);
            break;
        case '/contact':
            sendFile('contact.html',200,response)
            break;
        case '/whichweek/':
            let params = url.searchParams;
            console.log(params)
            let d = params.get("d");
            let m = params.get("m");
            let y = params.get("y");
            let weekResult = getDaysDiff(d,m,y);
            let output = "";
            response.writeHead(200, {
                "Content-Type": "text/html",
              });
            if (weekResult == -1) {
                output = "Wrong Date!!! First day in Sem 2 is the 26th of July 2021";
            }

            else if (weekResult > 14) {
                output = "Wrong Date!!! Last day in Sem 2 is the 30th of October 2021";
            }

            else {
                output = "We are in week " + weekResult;
            }
            response.end(output);
            break;
        default:
            sendFile('error.html', 404, response);
            break;
    }
}).listen(8080);
console.log('Server running at http://127.0.0.1:8080/');


function getDaysDiff(d, m, y) {
    let returnValue = -1;
    let currentDay = new Date();
    currentDay.setDate(parseInt(d));
    currentDay.setMonth(parseInt(m) - 1); // months start from 0
    currentDay.setYear(parseInt(y));
    let firstDay = new Date("7/26/2021"); // first day in semester 2
    if (currentDay >= firstDay) {
        var diffDays = parseInt((currentDay - firstDay) / (1000 * 60 * 60 * 24)); //gives day difference 
        returnValue = (Math.floor(diffDays / 7) + 1);
    }
    return (returnValue);
}

let sendFile =  function(fileName, responseNum, response) {fs.readFile(fileName, function (error, content) {
    response.writeHead(200, {
        'Content-Type': 'text/html'
    });
    response.end(content, 'utf-8');
});};