// first must require the many packages to build the app

//this is the webserver , responsible for handling your transmiting
// of data
var express = require('express');
//here we are invoking an instance of the app with express
var app = express();

//body parser helps us use json in an easier way
var bodyParser = require('body-parser');

// mongoose is our ORM for MongoDB 
//  object relational mapping
// / turning a json 'object' and mapping to schema 
// enve tho Mongo is a NOsql db
var mongoose = require('mongoose');
var PORT = process.env.PORT || 3000;

//set a connection to my local host
mongoose.connect('mongodb://localhost/nytreact');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Mongo connection succesfull')
});

//Now I need middleware as helper throughout the app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(express.static(__dirname + '/public/assets'));


// gets the api routes from the controller.js file and sets
// the middleware
var routes = require("./controllers/controllers.js");
app.use('/', routes);

// starts listening to an environment port or the local specified

app.listen(PORT, function() {
    console.log("Listening on port ", PORT)
})
