'use strict';

var partnersApp = angular.module('partners');

// Partners controller
partnersApp.controller('PartnersController', ['$scope', '$stateParams', 'Authentication', 'Partners',
	function($scope, $stateParams, Authentication, Partners) {

		this.authentication = Authentication;

		// Find a list of Partners

		this.partners = Partners.query();





	}
]);

partnersApp.controller('PartnersCreateController', ['$scope', '$location', 'Authentication', 'Partners',
	function($scope, $location, Authentication, Partners) {
		this.authentication = Authentication;

		// Create new Partner
		this.create = function() {
			// Create new Partner object
			var partner = new Partners ({
				name: $scope.name,
			});

			// Redirect after save
			partner.$save(function(response) {
				$location.path('partners/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};
	}
]);

partnersApp.controller('PartnersEditController', ['$scope', '$stateParams', 'Partners', '$modal', '$log',
	function($scope, $stateParams, Partners, $modal, $log) {

		// Open a modal window to Update a single partner record
		this.logoUpdate = function (size, selectedPartner) {

	    var modalInstance = $modal.open({
	      animation: $scope.animationsEnabled,
	      templateUrl: 'modules/partners/views/logo-update.client.view.html',
	      controller: function ($scope, $modalInstance, partner) {
					$scope.partner = partner;
				},
	      size: size,
	      resolve: {
	        partner: function () {
	          return selectedPartner;
	        }
	      }
	    });

	    modalInstance.result.then(function (selectedItem) {
	      $scope.selected = selectedItem;
	    }, function () {
	      $log.info('Modal dismissed at: ' + new Date());
	    });
	  };
		this.headerUpdate = function (size, selectedPartner) {

	    var modalInstance = $modal.open({
	      animation: $scope.animationsEnabled,
	      templateUrl: 'modules/partners/views/header-update.client.view.html',
	      controller: function ($scope, $modalInstance, partner) {
					$scope.partner = partner;
				},
	      size: size,
	      resolve: {
	        partner: function () {
	          return selectedPartner;
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

		// Update existing Partner
		this.update = function(updatedCustomer) {
			var partner = updatedCustomer;

			partner.$update(function() {

			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find existing Partner
		this.findOne = function() {
			$scope.partner = Partners.get({
				partnerId: $stateParams.partnerId
			});
		};


	}
]);


		// // Create new Partner
		// $scope.create = function() {
		// 	// Create new Partner object
		// 	var partner = new Partners ({
		// 		name: this.name,
		// 		slogan: this.slogan,
		// 		shortDescription: this.shortDescription,
		// 		communication: this.communication,
		// 		country: this.country,
		// 		city: this.city,
		// 		specialization: this.specialization,
		// 		logo: this.logo,
		// 		header: this.header,
		// 		thumbnail: this.thumbnail
		// 	});
		//
		// 	// Redirect after save
		// 	partner.$save(function(response) {
		// 		$location.path('partners/' + response._id);
		//
		// 		// Clear form fields
		// 		$scope.name = '';
		// 	}, function(errorResponse) {
		// 		$scope.error = errorResponse.data.message;
		// 	});
		// };
		//
		// // Remove existing Partner
		// $scope.remove = function(partner) {
		// 	if ( partner ) {
		// 		partner.$remove();
		//
		// 		for (var i in $scope.partners) {
		// 			if ($scope.partners [i] === partner) {
		// 				$scope.partners.splice(i, 1);
		// 			}
		// 		}
		// 	} else {
		// 		$scope.partner.$remove(function() {
		// 			$location.path('partners');
		// 		});
		// 	}
		// };
		//
		// // Update existing Partner
		// $scope.update = function() {
		// 	var partner = $scope.partner;
		//
		// 	partner.$update(function() {
		// 		$location.path('partners/' + partner._id + '/edit');
		// 	}, function(errorResponse) {
		// 		$scope.error = errorResponse.data.message;
		// 	});
		// };
		//
		//
		//
		// // Find existing Partner
		// $scope.findOne = function() {
		// 	$scope.partner = Partners.get({
		// 		partnerId: $stateParams.partnerId
		// 	});
		// };
