'use strict';

// Configuring the Articles module
angular.module('statics').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'About Us', 'aboutus', 'item', '/aboutus(?:/[^/]+)?', null, null, 0);
    Menus.addMenuItem('topbar', 'Contact', 'contact', 'item', '/contact(?:/[^/]+)?', null, null, 10);
	}
]);
