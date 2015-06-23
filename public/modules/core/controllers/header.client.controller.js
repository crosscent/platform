'use strict';

angular.module('core').controller('HeaderController', ['$scope', '$rootScope', '$window', 'Authentication', 'Menus',
	function($scope, $rootScope, $window, Authentication, Menus) {
		$scope.authentication = Authentication;
		$scope.isCollapsed = false;
		$scope.menu = Menus.getMenu('topbar');
		$scope.adminMenu = Menus.getMenu('admin');
		$rootScope.url = $window.location.href;
		$rootScope.$on('$stateChangeStart',
			function(event, toState, toParams, fromState, fromParams){
				$rootScope.url = $window.location.href;
			});


		$scope.toggleCollapsibleMenu = function() {
			$scope.isCollapsed = !$scope.isCollapsed;
		};

		// Collapsing the menu after navigation
		$scope.$on('$stateChangeSuccess', function() {
			$scope.isCollapsed = false;
		});
	}
]);
