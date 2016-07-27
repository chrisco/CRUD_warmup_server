var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var db = require('../db/api');

var bcrypt = require('bcrypt');
var salt = bcrypt.genSaltSync(10);

// Create new user
router.post('/', function(req, res, next) {
	db.getUserByPhone(req.body.phone)
		.then(function(data) {
			var user = data;
			if (!user) {
        var clearTextPw = req.body.pw;
        req.body.pw = bcrypt.hashSync(clearTextPw, salt);
        db.createUser(req.body)
        .then(function(user) {
          res.send(user);
        });
			} else {
        res.send({Error: 'User already exists'});
			}
		});
});

module.exports = router;
