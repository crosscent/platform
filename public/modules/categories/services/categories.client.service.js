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
