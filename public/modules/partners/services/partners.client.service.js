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
