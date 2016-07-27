var express = require('express');
var router = express.Router();

var user_calls = require('./user_calls');
router.use('/user_calls', user_calls);

var app_users = require('./app_users');
router.use('/app_users', app_users);

var signup = require('./signup');
router.use('/signup', signup);

module.exports = router;
