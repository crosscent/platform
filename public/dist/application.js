'use strict';

// Init the application configuration module for AngularJS application
var ApplicationConfiguration = (function() {
	// Init module configuration options
	var applicationModuleName = 'sense-forage';
	var applicationModuleVendorDependencies = ['ngResource', 'ngCookies',  'ngAnimate',  'ngTouch',  'ngSanitize',  'ui.router', 'ui.bootstrap', 'ui.utils', 'ngSocial', 'slugifier'];

	// Add a new vertical module
	var registerModule = function(moduleName, dependencies) {
		// Create angular module
		angular.module(moduleName, dependencies || []);

		// Add the module to the AngularJS configuration file
		angular.module(applicationModuleName).requires.push(moduleName);
	};

	return {
		applicationModuleName: applicationModuleName,
		applicationModuleVendorDependencies: applicationModuleVendorDependencies,
		registerModule: registerModule
	};
})();

'use strict';

//Start by defining the main module and adding the module dependencies
angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);

// Setting HTML5 Location Mode
angular.module(ApplicationConfiguration.applicationModuleName).config(['$locationProvider',
	function($locationProvider) {
		$locationProvider.hashPrefix('!');
	}
]);

//Then define the init function for starting up the application
angular.element(document).ready(function() {
	//Fixing facebook bug with redirect
	if (window.location.hash === '#_=_') window.location.hash = '#!';

	//Then init the app
	angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
});

'use strict';

// Use application configuration module to register a new module
ApplicationConfiguration.registerModule('admin');

'use strict';

// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('articles');
'use strict';

// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('categories');
'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('core');
'use strict';

// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('partners');
'use strict';

// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('products');
'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('users');
'use strict';

// Configuring the Articles module
angular.module('admin').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('admin', 'Admin', 'admin', 'dropdown', '/');
		Menus.addSubMenuItem('admin', 'admin', 'User Control', 'admin/usercontrol');
	}
]);

'use strict';

//Setting up route
angular.module('admin').config(['$stateProvider',
	function($stateProvider) {
		// Admin state routing
		$stateProvider.
		state('admin-usercontrol-list', {
			url: '/admin/usercontrol',
			templateUrl: 'modules/admin/views/user-list.client.view.html'
		}).
		state('admin-usercontrol-edit', {
			url: '/admin/usercontrol/:userId/edit',
			templateUrl: 'modules/admin/views/user-edit.client.view.html'
		});
	}
]);

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

'use strict';

//Admin service used to communicate users REST endpoints
angular.module('admin').factory('UsersAdmin', ['$resource',
	function($resource) {
		return $resource('admin/usercontrol/:userId', { userId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);

'use strict';

// Configuring the Articles module
angular.module('articles').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Articles', 'articles', 'item', '/articles(?:/[^/]+)?');

		// Set admin menu items
		Menus.addMenuItem('admin', 'Articles', 'articles', 'dropdown', '/articles(/create)?');
		Menus.addSubMenuItem('admin', 'articles', 'List Articles', 'articles');
		Menus.addSubMenuItem('admin', 'articles', 'New Article', 'articles/create');
	}
]);

'use strict';

//Setting up route
angular.module('articles').config(['$stateProvider',
	function($stateProvider) {
		// Articles state routing
		$stateProvider.
		state('listArticles', {
			url: '/articles',
			templateUrl: 'modules/articles/views/list-articles.client.view.html'
		}).
		state('createArticle', {
			url: '/articles/create',
			templateUrl: 'modules/articles/views/create-article.client.view.html'
		}).
		state('viewArticle', {
			url: '/articles/:articleId',
			templateUrl: 'modules/articles/views/view-article.client.view.html'
		}).
		state('editArticle', {
			url: '/articles/:articleId/edit',
			templateUrl: 'modules/articles/views/edit-article.client.view.html'
		});
	}
]);
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

'use strict';

//Articles service used to communicate Articles REST endpoints
angular.module('articles').factory('Articles', ['$resource',
	function($resource) {
		return $resource('articles/:articleId', { articleId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
'use strict';

// Configuring the Articles module
angular.module('categories').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Categories', 'categories', 'item', '/categories(?:/[^/]+)?');

		// Set admin menu items
		Menus.addMenuItem('admin', 'Categories', 'categories', 'dropdown', '/categories(/create)?');
		Menus.addSubMenuItem('admin', 'categories', 'List Categories', 'categories');
		Menus.addSubMenuItem('admin', 'categories', 'New Category', 'categories/create');
	}
]);

'use strict';

//Setting up route
angular.module('categories').config(['$stateProvider',
	function($stateProvider) {
		// Categories state routing
		$stateProvider.
		state('listCategories', {
			url: '/categories',
			templateUrl: 'modules/categories/views/list-categories.client.view.html'
		}).
		state('createCategory', {
			url: '/categories/create',
			templateUrl: 'modules/categories/views/create-category.client.view.html'
		}).
		state('viewCategory', {
			url: '/categories/:categoryId',
			templateUrl: 'modules/categories/views/view-category.client.view.html'
		}).
		state('editCategory', {
			url: '/categories/:categoryId/edit',
			templateUrl: 'modules/categories/views/edit-category.client.view.html'
		});
	}
]);
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

'use strict';

//Categories service used to communicate Categories REST endpoints
angular.module('categories').factory('Categories', ['$resource',
	function($resource) {
		return $resource('categories/:categoryId', { categoryId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
//Categories service used to communicate Categories REST endpoints
angular.module('categories').factory('ProductsListByCat', ['$resource',
	function($resource) {
		return $resource('categories/:categoryId/list', { categoryId: '@_id'
		});
	}
]);

'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		// Redirect to home view when route not found
		$urlRouterProvider.otherwise('/');

		// Home state routing
		$stateProvider.
		state('home', {
			url: '/',
			templateUrl: 'modules/core/views/home.client.view.html'
		});
	}
]);
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

'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication',
	function($scope, Authentication) {
		// This provides Authentication context.
		$scope.authentication = Authentication;
	}

]);

angular.module('core').controller('TabsCtrl', ["$scope", "$window", function ($scope, $window) {

}]);

'use strict';

angular.module('core').directive('updateTitle', ['$rootScope', '$timeout',
  function($rootScope, $timeout) {
    return {
      link: function(scope, element) {

        var listener = function(event, toState, $stateParams) {

          var title = 'Sense Forage';
          if (toState.data && toState.data.pageTitle) title = title + ' - ' + toState.data.pageTitle;
          if ($stateParams.productSlug) {
            var subtitle = $stateParams.productSlug.split('-').join(' ');
            title = title + ' - ' + subtitle;
            }

          $timeout(function() {
            element.text(title);
          }, 0, false);
        };

        $rootScope.$on('$stateChangeSuccess', listener);
      }
    };
  }
]);

'use strict';

angular.module('core').directive('updateUrl', ['$rootScope', '$timeout',
  function($rootScope, $timeout) {
    return {
      link: function(scope, element) {

        var listener = function(event, toState) {

          var url = 'Default Url';
          if (toState.data && toState.data.url) url = toState.data.url;

          $timeout(function() {
            element.text(url);
          }, 0, false);
        };

        $rootScope.$on('$stateChangeSuccess', listener);
      }
    };
  }
]);

'use strict';

//Menu service used for managing  menus
angular.module('core').service('Menus', [

	function() {
		// Define a set of default roles
		this.defaultRoles = ['*'];

		// Define the menus object
		this.menus = {};

		// A private function for rendering decision
		var shouldRender = function(user) {
			if (user) {
				if (!!~this.roles.indexOf('*')) {
					return true;
				} else {
					for (var userRoleIndex in user.roles) {
						for (var roleIndex in this.roles) {
							if (this.roles[roleIndex] === user.roles[userRoleIndex]) {
								return true;
							}
						}
					}
				}
			} else {
				return this.isPublic;
			}

			return false;
		};

		// Validate menu existance
		this.validateMenuExistance = function(menuId) {
			if (menuId && menuId.length) {
				if (this.menus[menuId]) {
					return true;
				} else {
					throw new Error('Menu does not exists');
				}
			} else {
				throw new Error('MenuId was not provided');
			}

			return false;
		};

		// Get the menu object by menu id
		this.getMenu = function(menuId) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Return the menu object
			return this.menus[menuId];
		};

		// Add new menu object by menu id
		this.addMenu = function(menuId, isPublic, roles) {
			// Create the new menu
			this.menus[menuId] = {
				isPublic: isPublic || false,
				roles: roles || this.defaultRoles,
				items: [],
				shouldRender: shouldRender
			};

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeMenu = function(menuId) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Return the menu object
			delete this.menus[menuId];
		};

		// Add menu item object
		this.addMenuItem = function(menuId, menuItemTitle, menuItemURL, menuItemType, menuItemUIRoute, isPublic, roles, position) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Push new menu item
			this.menus[menuId].items.push({
				title: menuItemTitle,
				link: menuItemURL,
				menuItemType: menuItemType || 'item',
				menuItemClass: menuItemType,
				uiRoute: menuItemUIRoute || ('/' + menuItemURL),
				isPublic: ((isPublic === null || typeof isPublic === 'undefined') ? this.menus[menuId].isPublic : isPublic),
				roles: ((roles === null || typeof roles === 'undefined') ? this.menus[menuId].roles : roles),
				position: position || 0,
				items: [],
				shouldRender: shouldRender
			});

			// Return the menu object
			return this.menus[menuId];
		};

		// Add submenu item object
		this.addSubMenuItem = function(menuId, rootMenuItemURL, menuItemTitle, menuItemURL, menuItemUIRoute, isPublic, roles, position) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item
			for (var itemIndex in this.menus[menuId].items) {
				if (this.menus[menuId].items[itemIndex].link === rootMenuItemURL) {
					// Push new submenu item
					this.menus[menuId].items[itemIndex].items.push({
						title: menuItemTitle,
						link: menuItemURL,
						uiRoute: menuItemUIRoute || ('/' + menuItemURL),
						isPublic: ((isPublic === null || typeof isPublic === 'undefined') ? this.menus[menuId].items[itemIndex].isPublic : isPublic),
						roles: ((roles === null || typeof roles === 'undefined') ? this.menus[menuId].items[itemIndex].roles : roles),
						position: position || 0,
						shouldRender: shouldRender
					});
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeMenuItem = function(menuId, menuItemURL) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item to remove
			for (var itemIndex in this.menus[menuId].items) {
				if (this.menus[menuId].items[itemIndex].link === menuItemURL) {
					this.menus[menuId].items.splice(itemIndex, 1);
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeSubMenuItem = function(menuId, submenuItemURL) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item to remove
			for (var itemIndex in this.menus[menuId].items) {
				for (var subitemIndex in this.menus[menuId].items[itemIndex].items) {
					if (this.menus[menuId].items[itemIndex].items[subitemIndex].link === submenuItemURL) {
						this.menus[menuId].items[itemIndex].items.splice(subitemIndex, 1);
					}
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		//Adding the topbar menu
		this.addMenu('topbar', true);
		this.addMenu('admin', false, ['admin']);
	}
]);

'use strict';

// Configuring the Articles module
angular.module('partners').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Partners', 'partners');

		// Set admin menu items
		Menus.addMenuItem('admin', 'Partners', 'partners', 'dropdown', '/partners(/create)?');
		Menus.addSubMenuItem('admin', 'partners', 'List Partners', 'partners');
		Menus.addSubMenuItem('admin', 'partners', 'New Partner', 'partners/create');
	}
]);

'use strict';

//Setting up route
angular.module('partners').config(['$stateProvider',
	function($stateProvider) {
		// Partners state routing
		$stateProvider.
		state('listPartners', {
			url: '/partners',
			templateUrl: 'modules/partners/views/list-partners.client.view.html'
		}).
		state('createPartner', {
			url: '/partners/create',
			templateUrl: 'modules/partners/views/create-partner.client.view.html'
		}).
		state('viewPartner', {
			url: '/partners/:partnerId',
			templateUrl: 'modules/partners/views/view-partner.client.view.html'
		}).
		state('editPartner', {
			url: '/partners/:partnerId/edit',
			templateUrl: 'modules/partners/views/edit-partner.client.view.html'
		});
	}
]);
'use strict';

var partnersApp = angular.module('partners');

// Partners controller
partnersApp.controller('PartnersController', ['$scope', '$stateParams', 'Authentication', 'Partners', 'ProductsListByPartner',
	function($scope, $stateParams, Authentication, Partners, ProductsListByPartner) {

		$scope.authentication = Authentication;

		// Find a list of Partners
		this.partners = Partners.query();



		// Find existing Partner
		this.findOne = function() {
			$scope.partner = Partners.get({
				partnerId: $stateParams.partnerId
			});
			$scope.slides = [1,2,3,4,5];
			// Find a list of ProductsList
			this.productsList = ProductsListByPartner.query({
				partnerId: $stateParams.partnerId
			});
		};
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

partnersApp.controller('PartnersEditController', ['$scope', '$stateParams', 'Partners', '$modal', '$log', '$location',
	function($scope, $stateParams, Partners, $modal, $log, $location) {

		// Open a modal window to Update a single partner record
		this.logoUpdate = function (size, selectedPartner) {

	    var modalInstance = $modal.open({
	      animation: $scope.animationsEnabled,
	      templateUrl: 'modules/partners/views/logo-update.client.view.html',
	      controller: ["$scope", "$modalInstance", "partner", function ($scope, $modalInstance, partner) {
					$scope.partner = partner;
				}],
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

		// Add a new image
		this.addHeader = function() {
			var partner = $scope.partner;

			partner.header.push({link: 'enter link'});
		};

		// Delete image
		this.deleteHeader = function(index) {
			var partner = $scope.partner;
			partner.header.splice(index, 1);
		};

		// Update existing Partner
		this.update = function() {
			var partner = $scope.partner;

			partner.$update(function() {
				$location.path('partners/' + partner._id);
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

'use strict';

angular.module('partners').directive('disableAnimation', ["$animate", function($animate){
    return {
        restrict: 'A',
        link: function($scope, $element, $attrs){
            $attrs.$observe('disableAnimation', function(value){
                $animate.enabled(!value, $element);
            });
        }
    };
}]);

'use strict';

//Partners service used to communicate Partners REST endpoints
angular.module('partners').factory('Partners', ['$resource',
	function($resource) {
		return $resource('partners/:partnerId', { partnerId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);

//Partners service used to communicate Partners REST endpoints
angular.module('partners').factory('ProductsListByPartner', ['$resource',
	function($resource) {
		return $resource('partners/:partnerId/list', { partnerId: '@_id'
		});
	}
]);

'use strict';

// Configuring the Articles module
angular.module('products').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Products', 'products', 'item', '/products(?:/[^/]+)?');

		// Set admin menu items
		Menus.addMenuItem('admin', 'Products', 'products', 'dropdown', '/products(/create)?');
		Menus.addSubMenuItem('admin', 'products', 'List Products', 'products');
		Menus.addSubMenuItem('admin', 'products', 'New Product', 'products/create');
	}
]);

'use strict';

//Setting up route
angular.module('products').config(['$stateProvider',
	function($stateProvider) {
		// Products state routing
		$stateProvider.
		state('listProducts', {
			url: '/products',
			templateUrl: 'modules/products/views/list-products.client.view.html',
			data: {
				pageTitle: 'Product Listing'
			}
		}).
		state('createProduct', {
			url: '/products/create',
			templateUrl: 'modules/products/views/create-product.client.view.html'
		}).
		state('viewProduct', {
			url: '/products/item/:productSlug',
			templateUrl: 'modules/products/views/view-product.client.view.html'
		}).
		state('editProduct', {
			url: '/products/:productId/edit',
			templateUrl: 'modules/products/views/edit-product.client.view.html'
		});
	}
]);

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
				controller: ["$scope", "$modalInstance", "product", function ($scope, $modalInstance, product) {
					$scope.product = product;
				}],
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

'use strict';

'use strict';

//Products service used to communicate Products REST endpoints
angular.module('products').factory('Products', ['$resource',
	function($resource) {
		return $resource('products/:productId/:controller', { productId: '@_id'
		}, {
			update: {
				method: 'PUT'
			},
			getBySlug: {
				method: 'GET',
				params: {
					controller: 'read-slug'
				}
			}
		});
	}
]);

'use strict';

// Config HTTP Error Handling
angular.module('users').config(['$httpProvider',
	function($httpProvider) {
		// Set the httpProvider "not authorized" interceptor
		$httpProvider.interceptors.push(['$q', '$location', 'Authentication',
			function($q, $location, Authentication) {
				return {
					responseError: function(rejection) {
						switch (rejection.status) {
							case 401:
								// Deauthenticate the global user
								Authentication.user = null;

								// Redirect to signin page
								$location.path('signin');
								break;
							case 403:
								// Add unauthorized behaviour 
								break;
						}

						return $q.reject(rejection);
					}
				};
			}
		]);
	}
]);
'use strict';

// Setting up route
angular.module('users').config(['$stateProvider',
	function($stateProvider) {
		// Users state routing
		$stateProvider.
		state('profile', {
			url: '/settings/profile',
			templateUrl: 'modules/users/views/settings/edit-profile.client.view.html'
		}).
		state('password', {
			url: '/settings/password',
			templateUrl: 'modules/users/views/settings/change-password.client.view.html'
		}).
		state('accounts', {
			url: '/settings/accounts',
			templateUrl: 'modules/users/views/settings/social-accounts.client.view.html'
		}).
		state('signup', {
			url: '/signup',
			templateUrl: 'modules/users/views/authentication/signup.client.view.html'
		}).
		state('signin', {
			url: '/signin',
			templateUrl: 'modules/users/views/authentication/signin.client.view.html'
		}).
		state('forgot', {
			url: '/password/forgot',
			templateUrl: 'modules/users/views/password/forgot-password.client.view.html'
		}).
		state('reset-invalid', {
			url: '/password/reset/invalid',
			templateUrl: 'modules/users/views/password/reset-password-invalid.client.view.html'
		}).
		state('reset-success', {
			url: '/password/reset/success',
			templateUrl: 'modules/users/views/password/reset-password-success.client.view.html'
		}).
		state('reset', {
			url: '/password/reset/:token',
			templateUrl: 'modules/users/views/password/reset-password.client.view.html'
		});
	}
]);

'use strict';

angular.module('users').controller('AuthenticationController', ['$scope', '$http', '$location', 'Authentication',
	function($scope, $http, $location, Authentication) {
		$scope.authentication = Authentication;

		// If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/');

		$scope.signup = function() {
			$http.post('/auth/signup', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;

				// And redirect to the index page
				$location.path('/');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		$scope.signin = function() {
			$http.post('/auth/signin', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;

				// And redirect to the index page
				$location.path('/');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
'use strict';

angular.module('users').controller('PasswordController', ['$scope', '$stateParams', '$http', '$location', 'Authentication',
	function($scope, $stateParams, $http, $location, Authentication) {
		$scope.authentication = Authentication;

		//If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/');

		// Submit forgotten password account id
		$scope.askForPasswordReset = function() {
			$scope.success = $scope.error = null;

			$http.post('/auth/forgot', $scope.credentials).success(function(response) {
				// Show user success message and clear form
				$scope.credentials = null;
				$scope.success = response.message;

			}).error(function(response) {
				// Show user error message and clear form
				$scope.credentials = null;
				$scope.error = response.message;
			});
		};

		// Change user password
		$scope.resetUserPassword = function() {
			$scope.success = $scope.error = null;

			$http.post('/auth/reset/' + $stateParams.token, $scope.passwordDetails).success(function(response) {
				// If successful show success message and clear form
				$scope.passwordDetails = null;

				// Attach user profile
				Authentication.user = response;

				// And redirect to the index page
				$location.path('/password/reset/success');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
'use strict';

angular.module('users').controller('SettingsController', ['$scope', '$http', '$location', 'Users', 'Authentication',
	function($scope, $http, $location, Users, Authentication) {
		$scope.user = Authentication.user;

		// If user is not signed in then redirect back home
		if (!$scope.user) $location.path('/');

		// Check if there are additional accounts 
		$scope.hasConnectedAdditionalSocialAccounts = function(provider) {
			for (var i in $scope.user.additionalProvidersData) {
				return true;
			}

			return false;
		};

		// Check if provider is already in use with current user
		$scope.isConnectedSocialAccount = function(provider) {
			return $scope.user.provider === provider || ($scope.user.additionalProvidersData && $scope.user.additionalProvidersData[provider]);
		};

		// Remove a user social account
		$scope.removeUserSocialAccount = function(provider) {
			$scope.success = $scope.error = null;

			$http.delete('/users/accounts', {
				params: {
					provider: provider
				}
			}).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				$scope.user = Authentication.user = response;
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		// Update a user profile
		$scope.updateUserProfile = function(isValid) {
			if (isValid) {
				$scope.success = $scope.error = null;
				var user = new Users($scope.user);

				user.$update(function(response) {
					$scope.success = true;
					Authentication.user = response;
				}, function(response) {
					$scope.error = response.data.message;
				});
			} else {
				$scope.submitted = true;
			}
		};

		// Change user password
		$scope.changeUserPassword = function() {
			$scope.success = $scope.error = null;

			$http.post('/users/password', $scope.passwordDetails).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				$scope.passwordDetails = null;
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
'use strict';

// Authentication service for user variables
angular.module('users').factory('Authentication', [
	function() {
		var _this = this;

		_this._data = {
			user: window.user
		};

		return _this._data;
	}
]);
'use strict';

// Users service used for communicating with the users REST endpoint
angular.module('users').factory('Users', ['$resource',
	function($resource) {
		return $resource('users', {}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
