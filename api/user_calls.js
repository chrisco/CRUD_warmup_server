var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

router.get('/', function(req, res, next) {
	knex('user_call').select()
		.then(function(user_calls) {
			res.json({
				user_calls: user_calls
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
