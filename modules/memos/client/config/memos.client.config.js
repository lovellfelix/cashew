'use strict';

// Configuring the Memos module
angular.module('memos').run(['Menus',
	function(Menus) {
		// Add the Memos dropdown item
		Menus.addMenuItem('topbar', {
			title: 'Memos',
			state: 'memos.list',
			icon: 'file-document',
			type: 'dropdown'
		});

		// Add the dropdown list item
		Menus.addSubMenuItem('topbar', 'memos', {
			title: 'List Memos',
			state: 'memos.list'
		});

		// Add the dropdown create item
		Menus.addSubMenuItem('topbar', 'memos', {
			title: 'Create Memo',
			state: 'memos.create'
		});
	}
]);
