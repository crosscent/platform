'use strict';

var categoriesApp = angular.module('categories');

// Categories controller
categoriesApp.controller('CategoriesController', ['$scope', '$stateParams', 'Authentication', 'Categories', 'ProductsListByCat',
	function($scope, $stateParams, Authentication, Categories, ProductsListByCat){

		this.authentication = Authentication;

		// Find a list of Categories

		this.categories = Categories.query();



		// Find existing Category
		this.findOne = function() {
			$scope.category = Categories.get({
				categoryId: $stateParams.categoryId
			});
			this.ProductsList = ProductsListByCat.query({
				categoryId: $stateParams.categoryId
			});
		};
	}
]);

categoriesApp.controller('CategoriesCreateController', ['$scope', '$location', 'Authentication', 'Categories',
	function($scope, $location, Authentication, Categories){
		this.authentication = Authentication;

		// Create new Category
		this.create = function() {
			// Create new Category object
			var category = new Categories ({
				name: $scope.name
			});

			// Redirect after save
			category.$save(function(response) {
				$location.path('categories/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};
	}
]);

categoriesApp.controller('CategoriesEditController', ['$scope', '$stateParams', 'Categories',
	function($scope, $stateParams, Categories){
		// Find a list of Categories
		$scope.find = function() {
			$scope.categories = Categories.query();
		};

		// Find existing Category
		$scope.findOne = function() {
			$scope.category = Categories.get({
				categoryId: $stateParams.categoryId
			});
		};
	}
]);

// angular.module('categories').controller('CategoriesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Categories',
// 	function($scope, $stateParams, $location, Authentication, Categories) {
// 		$scope.authentication = Authentication;
//
// 		// Create new Category
// 		$scope.create = function() {
// 			// Create new Category object
// 			var category = new Categories ({
// 				name: this.name
// 			});
//
// 			// Redirect after save
// 			category.$save(function(response) {
// 				$location.path('categories/' + response._id);
//
// 				// Clear form fields
// 				$scope.name = '';
// 			}, function(errorResponse) {
// 				$scope.error = errorResponse.data.message;
// 			});
// 		};
//
// 		// Remove existing Category
// 		$scope.remove = function(category) {
// 			if ( category ) {
// 				category.$remove();
//
// 				for (var i in $scope.categories) {
// 					if ($scope.categories [i] === category) {
// 						$scope.categories.splice(i, 1);
// 					}
// 				}
// 			} else {
// 				$scope.category.$remove(function() {
// 					$location.path('categories');
// 				});
// 			}
// 		};
//
// 		// Update existing Category
// 		$scope.update = function() {
// 			var category = $scope.category;
//
// 			category.$update(function() {
// 				$location.path('categories/' + category._id);
// 			}, function(errorResponse) {
// 				$scope.error = errorResponse.data.message;
// 			});
// 		};
//
// 		// Find a list of Categories
// 		$scope.find = function() {
// 			$scope.categories = Categories.query();
// 		};
//
// 		// Find existing Category
// 		$scope.findOne = function() {
// 			$scope.category = Categories.get({
// 				categoryId: $stateParams.categoryId
// 			});
// 		};
// 	}
// ]);
