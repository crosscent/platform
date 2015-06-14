'use strict';

var productsApp = angular.module('products');

// Products controller
productsApp.controller('ProductsController', ['$scope', '$stateParams', 'Authentication', 'Products',
	function($scope, $stateParams, Authentication, Products) {
		$scope.authentication = Authentication;

		// Find a list of Products
		this.find = function() {
			$scope.products = Products.query();
		};

		// Find existing Product
		this.findOne = function() {
			$scope.product = Products.get({
				productId: $stateParams.productId
			});
		};
	}
]);

productsApp.controller('ProductsCreateController', ['$scope', '$location', 'Authentication', 'Products',
	function($scope, $location, Authentication, Products) {
		this.authentication = Authentication;

		// Create new Product
		this.create = function() {
			// Create new Product object
			var product = new Products ({
				name: $scope.name
			});

			// Redirect after save
			product.$save(function(response) {
				$location.path('products/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};
	}
]);

productsApp.controller('ProductsEditController', ['$scope', '$stateParams', '$location', 'Products',
	function($scope, $stateParams, $location, Products) {
		// Find a list of Products
		this.find = function() {
			$scope.products = Products.query();
		};

		// Find existing Product
		this.findOne = function() {
			$scope.product = Products.get({
				productId: $stateParams.productId
			});
		};

		// Update existing Product
		this.update = function() {
			var product = $scope.product;

			product.$update(function() {
				$location.path('products/' + product._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

	}
]);
//
// $scope.authentication = Authentication;
//
// // Create new Product
// $scope.create = function() {
// 	// Create new Product object
// 	var product = new Products ({
// 		name: this.name
// 	});
//
// 	// Redirect after save
// 	product.$save(function(response) {
// 		$location.path('products/' + response._id);
//
// 		// Clear form fields
// 		$scope.name = '';
// 	}, function(errorResponse) {
// 		$scope.error = errorResponse.data.message;
// 	});
// };
//
// // Remove existing Product
// $scope.remove = function(product) {
// 	if ( product ) {
// 		product.$remove();
//
// 		for (var i in $scope.products) {
// 			if ($scope.products [i] === product) {
// 				$scope.products.splice(i, 1);
// 			}
// 		}
// 	} else {
// 		$scope.product.$remove(function() {
// 			$location.path('products');
// 		});
// 	}
// };
//
// // Update existing Product
// $scope.update = function() {
// 	var product = $scope.product;
//
// 	product.$update(function() {
// 		$location.path('products/' + product._id);
// 	}, function(errorResponse) {
// 		$scope.error = errorResponse.data.message;
// 	});
// };
//
// // Find a list of Products
// $scope.find = function() {
// 	$scope.products = Products.query();
// };
//
// // Find existing Product
// $scope.findOne = function() {
// 	$scope.product = Products.get({
// 		productId: $stateParams.productId
// 	});
// };
