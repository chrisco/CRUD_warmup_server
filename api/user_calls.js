var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var db = require('../db/api');

/**
 * @api {get} /user_calls Request list of all user_calls
 * @apiName GetAllUserCalls
 * @apiGroup UserCalls
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * [
 *   {
 *      "id": 1,
 *      "app_user_id": 1,
 *      "date": "2016-05-05T06:00:00.000Z",
 *      "left_message": true,
 *      "incoming": false
 *    }, {
 *      "id": 4,
 *      "app_user_id": 2,
 *      "date": "2016-05-08T06:00:00.000Z",
 *      "left_message": false,
 *      "incoming": true
 *    }
 * ]
 */
router.get('/', function(req, res, next) {
	db.getAllUserCalls()
		.then(function(user_calls) {
			res.json({
				user_calls: user_calls
			});
		});
});

/**
 * @api {get} /user_calls/:id Request user_call with ID
 * @apiName GetUserCallById
 * @apiGroup UserCalls
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *   "id": 1,
 *   "app_user_id": 1,
 *   "date": "2016-05-05T06:00:00.000Z",
 *   "left_message": true,
 *   "incoming": false
 * }
 */
router.get('/:id', function(req, res, next) {
	db.getUserCallById(req.params.id)
		.then(function(user_call) {
			res.json({
				user_call: user_call
			});
		});
});

/**
 * @api {post} /user_calls/ Create user_call
 * @apiName CreateUserCall
 * @apiGroup UserCalls
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *   "id": 1,
 *   "app_user_id": 1,
 *   "date": "2016-05-05T06:00:00.000Z",
 *   "left_message": true,
 *   "incoming": false
 * }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 * {
 *   "Error": error
 * }
 */
router.post('/', function(req, res, next) {
	console.log(req.body);
	db.createUserCall(req.body)
		.then(function(user_call) {
			res.json(user_call);
		})
		.catch(function(error) {
			res.status(500);
			res.json({
				Error: error
			});
		});
});

/**
 * @api {put} /user_calls/:id Update user_call with ID
 * @apiName UpdateUserCall
 * @apiGroup UserCalls
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *   "id": 1,
 *   "app_user_id": 1,
 *   "date": "2016-05-05T06:00:00.000Z",
 *   "left_message": true,
 *   "incoming": false
 * }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 * {
 *   "Error": "User_Call does not exist"
 * }
 */
router.put('/:id', function(req, res, next) {
	db.getUserCallById(req.params.id)
		.then(function(data) {
			var user_call = data;
			if (!user_call) {
				res.json({
					Error: 'User_Call does not exist'
				});
			} else {
				db.createUserCall(req.body)
					.then(function(user_call) {
						res.json(user_call);
					});
			}
		});
});

/**
 * @api {delete} /user_calls/:id Delete user_call with ID
 * @apiName DeleteUserCall
 * @apiGroup UserCalls
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *   "Message": "User_Call deleted"
 * }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 * {
 *   "Error": "User_Call does not exist"
 * }
 */
router.delete('/:id', function(req, res, next) {
	console.log(req.params.id);
	db.getUserCallById(req.params.id)
		.then(function(user_call) {
			console.log(user_call);
			if (!user_call) {
				res.json({
					Error: 'User_Call does not exist'
				});
			} else {
				db.deleteUserCallById(req.params.id)
					.then(function() {
						res.json({
							Message: 'User_Call deleted'
						});
					});
			}
		});
});

module.exports = router;
