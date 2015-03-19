'use strict';

var app = angular.module('core');

app.controller('HeaderController', ['$scope', '$state', '$mdSidenav', 'Authentication', 'Menus',
	function($scope, $state, $mdSidenav, Authentication, Menus) {
		// Expose view variables
		$scope.$state = $state;
		$scope.authentication = Authentication;

		// Get the topbar menu
		$scope.menu = Menus.getMenu('topbar');

		// Toggle the menu items
		$scope.isCollapsed = false;
		$scope.toggleCollapsibleMenu = function() {
			$scope.isCollapsed = !$scope.isCollapsed;
		};

		// Collapsing the menu after navigation
		$scope.$on('$stateChangeSuccess', function() {
			$scope.isCollapsed = false;
		});

		$scope.toggleSidenav = function(menuId) {
	      $mdSidenav(menuId).toggle();
	    };

	    $scope.toggleRight = function() {
	      $mdSidenav('right').toggle();
	    };
	}
]);

app.controller('LeftCtrl', function($scope, $timeout, $mdSidenav, $log) {
  $scope.close = function() {
    $mdSidenav('left').close()
      .then(function() {
        $log.debug('close LEFT is done');
      });
  };
});

app.controller('RightCtrl', function($scope, $timeout, $mdSidenav, $log) {
  $scope.close = function() {
    $mdSidenav('right').close()
      .then(function() {
        $log.debug('close RIGHT is done');
      });
  };
});
