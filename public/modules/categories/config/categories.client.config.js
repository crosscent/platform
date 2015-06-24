'use strict';

// Configuring the Articles module
angular.module('categories').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		// Menus.addMenuItem('topbar', 'Categories', 'categories', 'item', '/categories(?:/[^/]+)?', null, null, 9);

		// Set admin menu items
		Menus.addMenuItem('admin', 'Categories', 'categories', 'dropdown', '/categories(/create)?');
		Menus.addSubMenuItem('admin', 'categories', 'List Categories', 'categories');
		Menus.addSubMenuItem('admin', 'categories', 'New Category', 'categories/create');
	}
]);
