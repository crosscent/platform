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
