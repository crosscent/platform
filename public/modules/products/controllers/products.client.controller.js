'use strict';

var productsApp = angular.module('products');

// Products controller
productsApp.controller('ProductsController', ['$scope', '$stateParams', '$rootScope', 'Authentication', 'Products', 'Partners',
	function($scope, $stateParams, $rootScope, Authentication, Products, Partners) {
		$scope.authentication = Authentication;


		// Find a list of Products
		this.find = function() {
			$scope.products = Products.query();
		};

		// Find existing Product
		this.findOne = function() {
			Products.getBySlug({slug: $stateParams.productSlug
			}).$promise.then(function(product){
				$scope.product = product;
			});
		};
	}
]);

productsApp.controller('ProductsCreateController', ['$scope', '$location', 'Authentication', 'Products', 'Slug',
	function($scope, $location, Authentication, Products, Slug) {
		this.authentication = Authentication;

		// Create new Product
		this.create = function() {
			// Create new Product object
			var product = new Products ({
				name: $scope.name,
				category: $scope.categoryId,
				slug: Slug.slugify($scope.name)
			});

			// Redirect after save
			product.$save(function(response) {
				$location.path('products/item/' + response.slug);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};
	}
]);

productsApp.controller('ProductsEditController', ['$scope', '$stateParams', '$rootScope', '$location', 'Products', 'Categories', 'Partners', '$modal', '$log', 'Slug',
	function($scope, $stateParams, $rootScope, $location, Products, Categories, Partners, $modal, $log, Slug) {
		// Find a list of Products
		this.find = function() {
			$scope.products = Products.query();
		};

		// Find a list of categories
		this.categories = Categories.query();

		// Find a list of partners
		this.partners = Partners.query();

		// Find existing Product
		this.findOne = function() {
			$scope.product = Products.get({
				productId: $stateParams.productId
			});
		};

		// Update existing Product
		this.update = function() {
			var product = $scope.product;
			product.slug = Slug.slugify(product.name);
			product.$update(function() {
				$location.path('products/item/' + product.slug);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Add a new spec
		this.addSpec = function() {
			var product = $scope.product;

			product.specification.push({title: 'enter new spec', descript: 'enter descript'});
		};

		// Delete spec
		this.deleteSpec = function(index) {
			var product = $scope.product;
			product.specification.splice(index, 1);
		};

		// Add a new image
		this.addImage = function() {
			var product = $scope.product;

			product.images.push({link: 'enter link', descript: 'enter descript'});
		};

		// Delete image
		this.deleteImage = function(index) {
			var product = $scope.product;
			product.images.splice(index, 1);
		};
		// Open a modal window to Update a single partner record
		this.specUpdate = function (size, selectedProduct) {

			var modalInstance = $modal.open({
				animation: $scope.animationsEnabled,
				templateUrl: 'modules/products/views/spec-update.client.view.html',
				controller: function ($scope, $modalInstance, product) {
					$scope.product = product;
				},
				size: size,
				resolve: {
					product: function () {
						return selectedProduct;
					}
				}
			});

			modalInstance.result.then(function (selectedItem) {
				$scope.selected = selectedItem;
			}, function () {
				$log.info('Modal dismissed at: ' + new Date());
			});
		};

		this.toggleAnimation = function () {
			$scope.animationsEnabled = !$scope.animationsEnabled;
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
