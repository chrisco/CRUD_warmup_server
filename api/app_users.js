var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var db = require('../db/api');

var bcrypt = require('bcrypt');
var salt = bcrypt.genSaltSync(10);

router.get('/', function(req, res, next) {
	knex('app_user').select()
		.then(function(app_users) {
			res.json({
				app_users: app_users
			});
		});
});

router.get('/:id', function(req, res, next) {
	db.getUserById(req.params.id)
		.then(function(app_user) {
			res.json({
				app_user: app_user
			});
		});
});

router.post('/signup', function(req, res, next) {
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
				res.send({
					Error: 'User already exists'
				});
			}
		});
});

router.put('/:id', function(req, res, next) {
	db.getUserById(req.params.id)
		.then(function(data) {
			var user = data;
			if (!user) {
				res.send({Error: 'User does not exist'});
			} else {
        var clearTextPw = req.body.pw;
				req.body.pw = bcrypt.hashSync(clearTextPw, salt);
				db.createUser(req.body)
					.then(function(user) {
						res.send(user);
					});
			}
		});
});

router.delete('/:id', function(req, res, next) {
  db.getUserById(req.params.id)
  .then(function(user) {
    console.log(user);
    if(!user) {
      res.send({Error: 'User does not exist'});
    } else {
      db.deleteUserById(req.params.id)
      .then(function() {
        res.send({Error: 'User deleted'});
      });
    }
  });
});


module.exports = router;
