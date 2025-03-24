//Express Configuration
import express = require('express');
var router = express.Router();

/* Get Default Route */
router.get('/', function(req, res, next) {
  res.render('index', {title: 'Home', page: 'home', user: '' })
});

/* GET home page. */
router.get('/home', function(req, res, next) {
  res.render('index', { title: 'Home', page: 'home', user: '' });
});

/* GET About page. */
router.get('/about', function(req, res, next) {
  res.render('index', { title: 'About Us', page: 'about', user: '' });
});

/* GET Projects page. */
router.get('/projects', function(req, res, next) {
  res.render('index', { title: 'Our Projects', page: 'projects', user: '' });
});

/* GET Services page. */
router.get('/services', function(req, res, next) {
  res.render('index', { title: 'Our Services', page: 'services', user: '' });
});

/* GET Contact page. */
router.get('/contact', function(req, res, next) {
  res.render('index', { title: 'Contact Us', page: 'contact', user: '' });
});

/* GET Login page. */
router.get('/login', function(req, res, next) {
  res.render('index', { title: 'Login', page: 'login', user: '' });
});

/* GET Register page. */
router.get('/register', function(req, res, next) {
  res.render('index', { title: 'Register', page: 'register', user: '' });
});

/* GET Logout page. */
router.get('/logout', function(req, res, next) {
  res.render('index', { title: 'Logout', page: 'logout', user: '' });
});

// Temporary Routing

/* GET contact-list page. */
router.get('/contact-list', function(req, res, next) {
  res.render('index', { title: 'Contact List', page: 'contact-list', user: 'admin' });
});

/* GET Edit page. */
router.get('/edit', function(req, res, next) {
  res.render('index', { title: 'Add', page: 'edit', user: 'admin' });
});

/* GET Edit page. */
router.get('/edit/:id', function(req, res, next) {
  // Retreive ID from the url params
  let id = req.params.id;
  res.render('edit', { title: 'Edit', page: 'edit', contactId: id, user: 'admin' });
});

module.exports = router;
