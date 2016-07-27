var knex = require('./knex');

module.exports = {

	getUserByPhone: function(phone) {
		return knex('app_user').where({
			phone: phone
		}).first();
	},

	createUser: function(user) {
		return knex('app_user').insert(user, 'id');
	}
};
