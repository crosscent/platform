'use strict';

//Products service used to communicate Products REST endpoints
angular.module('products').factory('Products', ['$resource',
	function($resource) {
		return $resource('products/:productId', { productId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);

angular.module('products').factory('Categories', ['$resource',
	function($resource) {
		return $resource('categories/:categoryId', { categoryId: '@_id'
		});
	}
]);

angular.module('products').factory('Partners', ['$resource',
	function($resource) {
		return $resource('partners/:partnerId', { partnerId: '@_id'
		});
	}
]);
