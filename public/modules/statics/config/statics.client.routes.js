'use strict';

//Setting up route
angular.module('statics').config(['$stateProvider',
	function($stateProvider) {
		// Statics state routing
		$stateProvider.
		state('aboutUs', {
			url: '/aboutus',
			templateUrl: 'modules/statics/views/about.statics.client.view.html',
			data: {
				pageTitle: 'About Us'
			}
		}).
		state('contactUs', {
			url: '/contact',
			templateUrl: 'modules/statics/views/contact.statics.client.view.html',
			data: {
				pageTitle: 'Contact us'
			}
		});
	}
]);
