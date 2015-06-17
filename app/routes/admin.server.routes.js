'use strict';

module.exports = function(app) {
	// User Routes
	var users = require('../../app/controllers/users.server.controller');
  var admin = require('../../app/controllers/admin.server.controller');

	app.route('/admin/usercontrol')
		.get(users.requiresLogin, users.hasAuthorization(['admin']), admin.userList);

	app.route('/admin/usercontrol/:userId')
		.get(admin.userRead, users.hasAuthorization(['admin']))
		.put(users.requiresLogin, users.hasAuthorization(['admin']), admin.userUpdate);

	// Finish by binding the User middleware
	app.param('userId', admin.userByID);

};
