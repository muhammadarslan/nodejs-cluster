
var express = require("express");
var app = express();
var process = require('process'); 

app.get('/',function(req,res){
    res.send("¨Hello from Process : " + process.pid);
});

var port = 9000;

app.listen(port,function() {
	console.log("Running at PORT : " + port);
});