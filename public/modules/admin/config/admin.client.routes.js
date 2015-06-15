'use strict';

//Setting up route
angular.module('admin').config(['$stateProvider',
	function($stateProvider) {
		// Admin state routing
		$stateProvider.
		state('admin-usercontrol', {
			url: '/admin/usercontrol',
			templateUrl: 'modules/admin/views/user-list.client.view.html'
		});
	}
]);
