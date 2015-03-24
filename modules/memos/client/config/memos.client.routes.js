'use strict';

//Setting up route
angular.module('memos').config(['$stateProvider',
	function($stateProvider) {
		// Memos state routing
		$stateProvider.
		state('memos', {
			abstract: true,
			url: '/memos',
			template: '<ui-view/>'
		}).
		state('memos.list', {
			url: '',
			templateUrl: 'modules/memos/views/list-memos.client.view.html'
		}).
		state('memos.create', {
			url: '/create',
			templateUrl: 'modules/memos/views/create-memo.client.view.html'
		}).
		state('memos.view', {
			url: '/:memoId',
			templateUrl: 'modules/memos/views/view-memo.client.view.html'
		}).
		state('memos.edit', {
			url: '/:memoId/edit',
			templateUrl: 'modules/memos/views/edit-memo.client.view.html'
		});
	}
]);