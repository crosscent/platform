'use strict';

var articlesApp = angular.module('articles');

// Articles controller
articlesApp.controller('ArticlesController', ['$scope', '$stateParams', 'Authentication', 'Articles',
	function($scope, $stateParams, Authentication, Articles) {
		$scope.authentication = Authentication;

		// Find a list of Articles
		this.find = function() {
			$scope.articles = Articles.query();
		};

		// Find existing Article
		this.findOne = function() {
			$scope.article = Articles.get({
				articleId: $stateParams.articleId
			});
		};
	}
]);

// Articles Edit controller
articlesApp.controller('ArticlesEditController', ['$scope', '$stateParams', '$location', 'Authentication', 'Articles',
	function($scope, $stateParams, $location, Authentication, Articles) {
		// Remove existing Article
		this.remove = function(article) {
			if ( article ) {
				article.$remove();

				for (var i in $scope.articles) {
					if ($scope.articles [i] === article) {
						$scope.articles.splice(i, 1);
					}
				}
			} else {
				$scope.article.$remove(function() {
					$location.path('articles');
				});
			}
		};

		// Find existing Article
		this.findOne = function() {
			$scope.article = Articles.get({
				articleId: $stateParams.articleId
			});
		};

		// Update existing Article
		this.update = function() {
			var article = $scope.article;

			article.$update(function() {
				$location.path('articles/' + article._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Image controls
		this.addImage = function() {
			var article = $scope.article;

			article.images.push({link: 'enter link', descript: 'enter descript'});
		};
		this.deleteImage = function(index) {
			var article = $scope.article;
			article.images.splice(index, 1);
		};

	}
]);

// Articles controller
articlesApp.controller('ArticlesCreateController', ['$scope', '$location', 'Authentication', 'Articles',
	function($scope, $location, Authentication, Articles) {

		$scope.authentication = Authentication;

		// Create new Article
		this.create = function() {
			// Create new Article object
			var article = new Articles ({
				name: $scope.name
			});

			// Redirect after save
			article.$save(function(response) {
				$location.path('articles/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};
	}
]);
// $scope.authentication = Authentication;
//
// // Create new Article
// $scope.create = function() {
// 	// Create new Article object
// 	var article = new Articles ({
// 		name: this.name
// 	});
//
// 	// Redirect after save
// 	article.$save(function(response) {
// 		$location.path('articles/' + response._id);
//
// 		// Clear form fields
// 		$scope.name = '';
// 	}, function(errorResponse) {
// 		$scope.error = errorResponse.data.message;
// 	});
// };
//
// // Remove existing Article
// $scope.remove = function(article) {
// 	if ( article ) {
// 		article.$remove();
//
// 		for (var i in $scope.articles) {
// 			if ($scope.articles [i] === article) {
// 				$scope.articles.splice(i, 1);
// 			}
// 		}
// 	} else {
// 		$scope.article.$remove(function() {
// 			$location.path('articles');
// 		});
// 	}
// };
//
// // Update existing Article
// $scope.update = function() {
// 	var article = $scope.article;
//
// 	article.$update(function() {
// 		$location.path('articles/' + article._id);
// 	}, function(errorResponse) {
// 		$scope.error = errorResponse.data.message;
// 	});
// };
//
// // Find a list of Articles
// $scope.find = function() {
// 	$scope.articles = Articles.query();
// };
//
// // Find existing Article
// $scope.findOne = function() {
// 	$scope.article = Articles.get({
// 		articleId: $stateParams.articleId
// 	});
// };
