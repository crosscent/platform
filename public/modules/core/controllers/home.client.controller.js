'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication',
	function($scope, Authentication) {
		// This provides Authentication context.
		$scope.authentication = Authentication;
	}

]);

angular.module('core').controller('TabsCtrl', function ($scope, $window) {

});
