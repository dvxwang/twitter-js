var express = require( 'express' );
var swig = require( 'swig' );
var app = express(); // creates an instance of an express application
var routes = require('./routes');
var socketio = require('socket.io');
var people = [{name: 'Full'}, {name: 'Stacker'}, {name: 'Son'}];

var server = app.listen(3000, function() {
  console.log("Port up and running!");
})
var io = socketio.listen(server);

app.engine('html', swig.renderFile);

app.set('view engine', 'html');
app.set('views', __dirname + '/views');

swig.setDefaults({ cache: false });

app.use(express.static('public'));

app.use(function(req,res,next) {
  console.log(req.method+" "+req.url);
  next();
  console.log("Eventual status code");
})

app.use('/', routes(io));

io.on('new_tweet', function(call){
  // Create an element for each piece of data in the phone call object.
  console.log("Reached IO process: ");
  console.log("Reached objetc: ",call);
  var newTweet = document.createElement('li');
  newTweet.textContent = "David"+call.name+call.text;
 
  // Append the new object to the #phone-calls div.
  document.getElementById('TweetLog').appendChild(newTweet);
});
