var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

router.get('/', function(req, res, next) {
	knex('app_user').select()
		.then(function(app_users) {
			res.json({
				app_users: app_users
			});
		});
});

router.get('/:id', function(req, res, next) {
	res.json({
		message: 'Not Implemented'
	});
});

router.post('/', function(req, res, next) {
	res.json({
		message: 'Not Implemented'
	});
});

router.put('/:id', function(req, res, next) {
	res.json({
		message: 'Not Implemented'
	});
});

router.delete('/:id', function(req, res, next) {
	res.json({
		message: 'Not Implemented'
	});
});


module.exports = router;
