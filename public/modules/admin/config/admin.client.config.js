'use strict';

// Configuring the Articles module
angular.module('admin').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('admin', 'Admin', 'admin', 'dropdown', '/');
		Menus.addSubMenuItem('admin', 'admin', 'User Control', 'admin/usercontrol');
	}
]);
