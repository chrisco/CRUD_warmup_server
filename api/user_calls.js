var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var db = require('../db/api');

router.get('/', function(req, res, next) {
	db.getAllUserCalls()
		.then(function(user_calls) {
			res.json({
				user_calls: user_calls
			});
		});
});

router.get('/:id', function(req, res, next) {
	db.getUserCallById(req.params.id)
		.then(function(user_call) {
			res.json({
				user_call: user_call
			});
		});
});

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
