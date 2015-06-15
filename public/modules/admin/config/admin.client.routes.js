'use strict';

//Setting up route
angular.module('admin').config(['$stateProvider',
	function($stateProvider) {
		// Admin state routing
		$stateProvider.
		state('admin-usercontrol-list', {
			url: '/admin/usercontrol',
			templateUrl: 'modules/admin/views/user-list.client.view.html'
		}).
		state('admin-usercontrol-edit', {
			url: '/admin/usercontrol/:userId/edit',
			templateUrl: 'modules/admin/views/user-edit.client.view.html'
		});
	}
]);
