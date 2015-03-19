'use strict';

var app = angular.module('core');

app.controller('HomeController', ['$scope', 'Authentication',
	function($scope,  Authentication) {
		// This provides Authentication context.
		$scope.authentication = Authentication;


	}
]);
