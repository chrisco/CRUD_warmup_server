var knex = require('./knex');

module.exports = {

	getAllAppUsers: function() {
		return knex('app_user').select();
	},

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
	},

	getAllUserCalls: function() {
		return knex('user_call').select();
	},

	getUserCallById: function(id) {
		return knex('user_call').where({
			id: id
		}).first();
	},

	createUserCall: function(user_call) {
		return knex('user_call').insert(user_call, 'id');
	},

	deleteUserCallById: function(id) {
		return knex('user_call').where({
			id: id
		}).del();
	}
};
