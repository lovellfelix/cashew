'use strict';

// Configuring the Employees module
var app = angular.module('employees');
app.run(['Menus',
	function(Menus) {
		// Add the Employees dropdown item
		Menus.addMenuItem('topbar', {
			title: 'Employees',
			state: 'employees.list',
			icon: 'account-multiple',
			type: 'dropdown'
		});

		// Add the dropdown list item
		Menus.addSubMenuItem('topbar', 'employees', {
			title: 'List Employees',
			state: 'employees.list'
		});

		// Add the dropdown create item
		Menus.addSubMenuItem('topbar', 'employees', {
			title: 'Create Employee',
			state: 'employees.create'
		});
	}
]);

app.run(function(editableOptions) {
  editableOptions.theme = 'default';
});
