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
