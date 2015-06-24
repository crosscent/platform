'use strict';

//Setting up route
angular.module('statics').config(['$stateProvider',
	function($stateProvider) {
		// Statics state routing
		$stateProvider.
		state('statics', {
			url: '/about',
			templateUrl: 'modules/statics/views/statics.client.view.html',
			data: {
				pageTitle: 'About Us'
			}
		});
	}
]);
