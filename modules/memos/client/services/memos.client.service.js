'use strict';

//Memos service used to communicate Memos REST endpoints
angular.module('memos').factory('Memos', ['$resource',
	function($resource) {
		return $resource('api/memos/:memoId', { memoId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);