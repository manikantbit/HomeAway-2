//import the require dependencies
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
var kafka = require('./kafka/client');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const passport  = require('passport');
var {User} = require('./model/user');
var {Property} = require('./model/property');
var {Order} = require('./model/order');
var multer = require('multer');
var userController = require('./routes/userController');
var propController = require('./routes/propertyController');
var orderController = require('./routes/orderController');
var mongoose= require('mongoose');

var URL = require('./config');


const options = {
  poolSize: 10, // Maintain up to 10 socket connections
  bufferMaxEntries: 0,
  useNewUrlParser: true
};


var mongoDB = 'mongodb://admin:cmpe273@ds131763.mlab.com:31763/cmpe273';

// Connect to our Database and handle any bad connections
mongoose.connect(mongoDB,options);
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.on('error', (err) => {
  console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
});

//use cors to allow cross origin resource sharing
//app.use(cors({ origin: URL.url.URL, credentials: true }));
app.use(bodyParser.json());

// multer storage code for images upload
var storage =   multer.diskStorage({
    destination: URL.imageStore.imageStore,
    filename: function (req, file, callback) {
      callback(null, file.fieldname + '-' + Date.now()+path.extname(file.originalname));
    }
})
var upload = multer({ storage : storage });
var session = require('express-session');
const MongoStore = require('connect-mongo')(session); 


//Allow Access Control
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin',"*");
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
  });

  app.use(session({
    name : 'homeaway',
    secret: "098878755854467997",
    resave: true,
    store:new MongoStore({ mongooseConnection: mongoose.connection }),
    saveUninitialized: true
}));


app.post('/login', userController.login)

app.get('/session', userController.session)

app.post('/signup',userController.signup)

app.post('/logout',userController.logout)

app.post('/profile',userController.postProfile)

app.get('/getprofile',userController.getProfile)

// User: Route to upload Profile pic
app.post("/avatar",upload.any(),userController.profileImage);

//Owner: Route to add new Property
app.post("/property",propController.addProp);

//Owner: Route to upload Property Images
app.post("/imageUpload",upload.any(),propController.propImage)
    
// Owner: Route to get Property by User ID
app.get('/getPropByUser',propController.getPropByUser);

//General: Route to get details by Property ID
app.get('/getPropById', propController.getPropByID);

//Owner: Route to update Property
app.put("/property", propController.updateProp);

//Users: Route to search Property
app.get('/getPropBySearch',propController.getPropbySearch);

//User: Route to book order
app.post("/order", orderController.Order);

//User: Show the trip history
app.get("/orders", orderController.myTrip)

//General: Post message
app.post('/message',userController.postMessage)

//General:Get message
app.get('/messages',userController.getMessage)


//start your server on port 7777
app.listen(7777);
console.log("Server Listening on port 7777");
