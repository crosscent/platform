'use strict';

// Configuring the Articles module
angular.module('articles').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Articles', 'articles', 'item', '/articles(?:/[^/]+)?', null, null, 7);

		// Set admin menu items
		Menus.addMenuItem('admin', 'Articles', 'articles', 'dropdown', '/articles(/create)?');
		Menus.addSubMenuItem('admin', 'articles', 'List Articles', 'articles');
		Menus.addSubMenuItem('admin', 'articles', 'New Article', 'articles/create');
	}
]);
