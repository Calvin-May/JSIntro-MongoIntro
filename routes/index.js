"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
var router = express.Router();
const ContactModel = require("../Models/contact");
const Contact = ContactModel.Model;
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Home', page: 'home', user: '' });
});
router.get('/home', function (req, res, next) {
    res.render('index', { title: 'Home', page: 'home', user: '' });
});
router.get('/about', function (req, res, next) {
    res.render('index', { title: 'About Us', page: 'about', user: '' });
});
router.get('/projects', function (req, res, next) {
    res.render('index', { title: 'Our Projects', page: 'projects', user: '' });
});
router.get('/services', function (req, res, next) {
    res.render('index', { title: 'Our Services', page: 'services', user: '' });
});
router.get('/contact', function (req, res, next) {
    res.render('index', { title: 'Contact Us', page: 'contact', user: '' });
});
router.get('/login', function (req, res, next) {
    res.render('index', { title: 'Login', page: 'login', user: '' });
});
router.get('/register', function (req, res, next) {
    res.render('index', { title: 'Register', page: 'register', user: '' });
});
router.get('/logout', function (req, res, next) {
    res.render('index', { title: 'Logout', page: 'logout', user: '' });
});
router.get('/contact-list', async function (req, res, next) {
    const contacts = await Contact.find({});
    console.log(contacts);
    res.json(contacts);
});
router.get('/edit', function (req, res, next) {
    res.render('index', { title: 'Add', page: 'edit', user: 'admin' });
});
router.get('/edit/:id', function (req, res, next) {
    let id = req.params.id;
    res.render('edit', { title: 'Edit', page: 'edit', contactId: id, user: 'admin' });
});
module.exports = router;
//# sourceMappingURL=index.js.map