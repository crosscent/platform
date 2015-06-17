'use strict';

// Configuring the Articles module
angular.module('products').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Products', 'products');

		// Set admin menu items
		Menus.addMenuItem('admin', 'Products', 'products', 'dropdown', '/products(/create)?');
		Menus.addSubMenuItem('admin', 'products', 'List Products', 'products');
		Menus.addSubMenuItem('admin', 'products', 'New Product', 'products/create');
	}
]);
