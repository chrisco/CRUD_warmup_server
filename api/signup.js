var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var db = require('../db/api');

router.post('/', function(req, res, next) {
	db.getUserByPhone(req.body.phone)
		.then(function(data) {
			var user = data;
			if (!user) {
				db.createUser(req.body)
        .then(function(user) {
          res.send(user);
        });
			} else {
        res.send(user);
			}
		});
});

module.exports = router;
