module.exports = function(io) {

  var express = require('express');
  var router = express.Router();
  // could use one line instead: var router = require('express').Router();
  var tweetBank = require('../tweetBank');
  var bodyParser = require('body-parser');

  router.use(bodyParser.urlencoded({ extended: false }))
  router.use(bodyParser.json())

  router.post('/tweets/', function(req, res) {
    var name = req.body.name;
    var text = req.body.text;
    tweetBank.add(name,text);
    io.emit('new_tweet', {name: name, text:text});
    console.log("Reached IO processInit");
    res.redirect("/");
  });

  router.get('/', function (req, res) {
    var tweets = tweetBank.list();
    res.render( 'index', { title: 'Twitter.js', tweets: tweets} );
  });

  router.get('/users/:name', function(req, res) {
    var name = req.params.name;
    var tweets = tweetBank.find( {name: name} );
    console.log("tweeter: ",name);
    res.render( 'index', { title: 'Twitter.js - Posts by '+name, tweets: tweets, username: name, showForm: true} );
  });

  router.get('/tweets/:id', function(req, res) {
    var idNum = +req.params.id;
    var tweets = tweetBank.find( {"counter": idNum} );
    res.render( 'index', { title: 'Twitter.js', tweets: tweets} );
  });

  return router;

};