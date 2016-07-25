var app = require('express').Router();
var User = require('../models/User.js');

app.get('/',require('connect-ensure-login').ensureLoggedIn(),function(req,res){
  res.render('index');
});

app.get('/war', require('connect-ensure-login').ensureLoggedIn(), function(req, res) {
  if (userArray[req.user.username]) return res.send('Mutiple connections are not allowed.')
  res.render('game')
});

app.get('/myHistory',require('connect-ensure-login').ensureLoggedIn(),function(req,res){
  if(req.user && req.user._id){
    User.findOne({_id:req.user._id},function(err,user){
      if(user){
        res.render('history',{data:user.logs});
      } else {
        res.redirect('/');
      }
    });
  } else {
    res.redirect('/');
  }
});

app.get('/login', function(req, res) {
  if (req.user) res.redirect('/');
  else res.render('login');
});

app.post('/login', passport.authenticate('local', {
  successReturnToOrRedirect: '/',
  failureRedirect: '/login'
}), function(req, res) {
  res.redirect('/');
});

// Logout
app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = app;
