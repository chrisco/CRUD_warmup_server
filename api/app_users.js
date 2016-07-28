var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var db = require('../db/api');

var bcrypt = require('bcrypt');
var salt = bcrypt.genSaltSync(10);

/**
 * @api {get} /app_users Request List of app_users
 * @apiName GetAllAppUsers
 * @apiGroup AppUsers
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * [
 *   {
 *     "id": 1,
 *     "pw": "$2a$04$oSY.1hOj44Bxezi.NTsr/.HZIlgTqPIueVFqNri7Y5sOD4eXm91Yi",
 *     "fname": "Bob",
 *     "lname": "Smith",
 *     "phone": "5551212"
 *   },
 *   {
 *     "id": 2,
 *     "pw": "$2a$04$oSY.1hOj44Bxezi.NTsr/.HZIlgTqPIueVFqNri7Y5sOD4eXm91Yi",
 *     "fname": "Alice",
 *     "lname": "Jones",
 *     "phone": "5551212"
 *   }
 * ]
 */
router.get('/', function(req, res, next) {
	db.getAllAppUsers()
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
						res.json(user);
					});
			} else {
				res.json({
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
				res.json({
					Error: 'User does not exist'
				});
			} else {
				var clearTextPw = req.body.pw;
				req.body.pw = bcrypt.hashSync(clearTextPw, salt);
				db.createUser(req.body)
					.then(function(user) {
						res.json(user);
					});
			}
		});
});

router.delete('/:id', function(req, res, next) {
	db.getUserById(req.params.id)
		.then(function(user) {
			console.log(user);
			if (!user) {
				res.json({
					Error: 'User does not exist'
				});
			} else {
				db.deleteUserById(req.params.id)
					.then(function() {
						res.json({
							Message: 'User deleted'
						});
					});
			}
		});
});

module.exports = router;
