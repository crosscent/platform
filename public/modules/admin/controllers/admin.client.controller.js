'use strict';

var adminApp = angular.module('admin');

// Users Controller

adminApp.controller('UserController', ['$scope', '$http', '$location', 'Authentication', 'UsersAdmin',
	function($scope, $http, $location, Authentication, UsersAdmin) {
		$scope.authentication = Authentication;

		this.users = UsersAdmin.query();
	}
]);

adminApp.controller('UserEditController', ['$scope', '$stateParams', '$location', 'UsersAdmin',
	function($scope, $stateParams, $location, UsersAdmin) {
		// Find existing User
		this.findOne = function() {
			$scope.user = UsersAdmin.get({
				userId: $stateParams.userId
			});
		};

		// Update existing User
		this.update = function() {
			var user = $scope.user;

			user.$update(function() {
				$location.path('admin/usercontrol' + user._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};
	}
]);
