var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var db = require('../db/api');

var bcrypt = require('bcrypt');
var salt = bcrypt.genSaltSync(10);

/**
 * @api {get} /app_users Request list of all app_users
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

/**
 * @api {get} /app_users/:id Request app_user with ID
 * @apiName GetUserById
 * @apiGroup AppUsers
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *   "id": 1,
 *   "pw": "$2a$04$oSY.1hOj44Bxezi.NTsr/.HZIlgTqPIueVFqNri7Y5sOD4eXm91Yi",
 *   "fname": "Bob",
 *   "lname": "Smith",
 *   "phone": "5551212"
 * }
 */
router.get('/:id', function(req, res, next) {
	db.getUserById(req.params.id)
		.then(function(app_user) {
			res.json({
				app_user: app_user
			});
		});
});

/**
 * @api {post} /app_users/ Create app_user
 * @apiName CreateAppUser
 * @apiGroup AppUsers
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *   "id": 1,
 *   "pw": "$2a$04$oSY.1hOj44Bxezi.NTsr/.HZIlgTqPIueVFqNri7Y5sOD4eXm91Yi",
 *   "fname": "Bob",
 *   "lname": "Smith",
 *   "phone": "5551212"
 * }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 * {
 *   "Error": "User already exists"
 * }
 */
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

/**
 * @api {put} /app_users/:id Update app_user with ID
 * @apiName UpdateAppUser
 * @apiGroup AppUsers
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *   "id": 1,
 *   "pw": "$2a$04$oSY.1hOj44Bxezi.NTsr/.HZIlgTqPIueVFqNri7Y5sOD4eXm91Yi",
 *   "fname": "Bob",
 *   "lname": "Smith",
 *   "phone": "5551212"
 * }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 * {
 *   "Error": "User does not exist"
 * }
 */
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

/**
 * @api {delete} /app_users/:id Delete app_user with ID
 * @apiName DeleteAppUser
 * @apiGroup AppUsers
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *   "Message": "User deleted"
 * }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 * {
 *   "Error": "User does not exist"
 * }
 */
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
