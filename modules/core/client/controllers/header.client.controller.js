'use strict';

var app = angular.module('core');

app.controller('HeaderController', ['$scope', '$state', '$mdSidenav', 'Authentication', 'Menus',  'LxNotificationService', 'LxDialogService',
  function($scope, $state, $mdSidenav, Authentication, Menus, LxNotificationService, LxDialogService) {
    // Expose view variables
    $scope.$state = $state;
    $scope.authentication = Authentication;

    // Get the topbar menu
    $scope.menu = Menus.getMenu('topbar');

    // Toggle the menu items
    $scope.isCollapsed = false;
    $scope.toggleCollapsibleMenu = function () {
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


    $scope.alert = function() {
      LxNotificationService.alert('Arawak', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sit amet urna quis nisi sodales semper pharetra eu augue.', 'Ok', function(answer) {
        // console.log(answer);
      });
    };

    $scope.opendDialog = function(dialogId) {
      LxDialogService.open(dialogId);
    };

    $scope.closingDialog = function() {
      LxNotificationService.info('Dialog closed!');
    };

  }
]);

app.controller('LeftCtrl', function($scope, $timeout, $mdSidenav, $log) {
  $scope.close = function() {
    $mdSidenav('left').close()
      .then(function() {});
  };
});

app.controller('RightCtrl', function($scope, $timeout, $mdSidenav, $log) {
  $scope.close = function() {
    $mdSidenav('right').close()
      .then(function() {});
  };
});
