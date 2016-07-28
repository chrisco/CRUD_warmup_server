var knex = require('./knex');

module.exports = {

	getUserByPhone: function(phone) {
		return knex('app_user').where({
			phone: phone
		}).first();
	},

	createUser: function(user) {
		return knex('app_user').insert(user, 'id');
	},

	getUserById: function(id) {
		return knex('app_user').where({
			id: id
		}).first();
	},

	deleteUserById: function(id) {
		return knex('app_user').where({
			id: id
		}).del();
	}
};
