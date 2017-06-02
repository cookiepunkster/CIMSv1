/**
 * VARIABLES
 */
var express         = require("express");
var app             = express();
var bodyParser      = require("body-parser");
// method override ????
var morgan          = require("morgan");
var session         = require("express-session");

/**
 * SERVER CONFIGURATION
 */
// port number config
var port = process.env.PORT || 8080;

// parsing data config
app.use(bodyParser.json());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use(bodyParser.urlencoded({ extended: true }));

// express-session config
app.use(session({ secret : "ui2hf893hf232ofn3023fp", resave : false , saveUninitialized : true }));

// logs config via morgan
//app.use(morgan('dev'));

// front-end static files config
app.use(express.static(__dirname + '/public'));

// setting my routes config 
require('./app/routes/routes')(app);
require('./app/routes/users')(app);
require('./app/routes/diseases')(app);
require('./app/routes/medicines')(app);
require('./app/routes/patients')(app);
require('./app/routes/abstracts')(app);
require('./app/routes/consultations')(app);
require('./app/routes/prescriptions')(app);

app.get('*', function(req, res) {
    res.sendfile('./public/index.html');
});

/**
 * 
 * TRIAL
 * 
 */

var mongoose        = require('mongoose');
var db              = 'mongodb://jolly:jolly@ds161551.mlab.com:61551/meddata';

mongoose.connect(db);

mongoose.connection.on("open", function(ref) {
  console.log("Connected to mongo server.");
});

/**
 * 
 * TRIAL
 * 
 */

// server start
app.listen(port, function() {
    console.log("Server is running at http://localhost:3000");
});

// exporting my app as well
exports = module.exports = app;