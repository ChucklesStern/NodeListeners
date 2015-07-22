var express = require('express');
var events = require("events");
//required. brings in the event emitter module
var EventEmitter = require("events").EventEmitter;
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
var port = process.env.PORT || 3000;


app.set('views', path.join(__dirname, 'views'));
//set the view engine that will render HTML from the server to the client
app.engine('.html', require('ejs').renderFile);
//Allow for these directories to be usable on the client side
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/bower_components'));
//we want to render html files
app.set('view engine', 'html');
app.set('view options', {
	layout: false
});

//middleware that allows for us to parse JSON and UTF-8 from the body of an HTTP request
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//on homepage load, render the index page
app.get('/', function(req, res) {
	res.render('index');
});
//upon navigation to the route '/enter-room' the event "enter" will be triggered
app.get('/enter-room', function(req, res){
	chatroom.emit("enter");
})

app.get('/new-message', function(req, res){
	chatroom.emit("new-message");
})
//again upon navigation to the route '/red-room' the "red-room" event will trigger
app.get('/red-room', function(req, res){
	chatroom.emit("red-room");
})



var server = app.listen(port, function() {
	var host = server.address().address;
	console.log('Example app listening at http://localhost:' + port);
});
//creates the EventEmitter method for use by the events
var chatroom = new EventEmitter();
//once the event "enter" is triggered then the function will be executed which consolelogs
chatroom.on("enter", function(){
	console.log("Someone has entered the room");
	//
})


chatroom.on("new-message", function() {
	console.log("hey!");
});

//Once the event "red-room" is triggered then the function will execute the consolelog
chatroom.on("red-room", function(){
	console.log("You have entered the red room");
});

console.log(chatroom);