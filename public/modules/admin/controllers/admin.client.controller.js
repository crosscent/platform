'use strict';

var adminApp = angular.module('admin');

// Users Controller

adminApp.controller('UserController', ['$scope', '$http', '$location', 'Authentication', 'UsersAdmin',
	function($scope, $http, $location, Authentication, UsersAdmin) {
		$scope.authentication = Authentication;

		this.users = UsersAdmin.query();
	}
]);
