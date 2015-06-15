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
