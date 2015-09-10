'use strict';

//Setting up route
angular.module('settings').config(['$stateProvider',
	function($stateProvider) {
		// Settings state routing
		$stateProvider.
		state('settings.list', {
			url: '',
			templateUrl: 'modules/settings/client/views/list-settings.client.view.html'
		}).
		state('settings.create', {
			url: '/create',
			templateUrl: 'modules/settings/client/views/create-setting.client.view.html'
		}).
		state('settings.view', {
			url: '/:settingId',
			templateUrl: 'modules/settings/client/views/view-setting.client.view.html'
		}).
		state('settings.edit', {
			url: '/:settingId/edit',
			templateUrl: 'modules/settings/client/views/edit-setting.client.view.html'
		});
	}
]);
