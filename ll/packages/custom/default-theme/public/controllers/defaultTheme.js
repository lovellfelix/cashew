'use strict';

/* jshint -W098 */
var app = angular.module('mean.default-theme', ['mean.system', 'ngMaterial', 'lumx']);

app.config(['$viewPathProvider', function($viewPathProvider) {
  $viewPathProvider.override('system/views/index.html', 'default-theme/views/index.html');
  $viewPathProvider.override('users/views/index.html', 'default-theme/views/auth/index.html');
  $viewPathProvider.override('users/views/login.html', 'default-theme/views/auth/login.html');
  $viewPathProvider.override('users/views/register.html', 'default-theme/views/auth/register.html');
  $viewPathProvider.override('users/views/reset-password.html', 'default-theme/views/auth/reset-password.html');
  $viewPathProvider.override('users/views/forgot-password.html', 'default-theme/views/auth/forgot-password.html');
}]);


app.controller('DefaultThemeController', ['$scope', '$rootScope', '$mdSidenav', 'Global', 'Menus', 'DefaultTheme',
  function($scope, $rootScope, $mdSidenav, Global, Menus, DefaultTheme, nowTime) {
    $scope.global = Global;
    $scope.menus = {};

    $scope.package = {
      name: 'default-theme'
    };

  $scope.pageLoadTime = (new Date()).toISOString();
  $scope.nowTime = nowTime;
  $scope.nowTimeAsDateObejct = new Date();

  $scope.date = new Date();

    $scope.toggleSidenav = function(menuId) {
      $mdSidenav(menuId).toggle();
    };

    $scope.toggleRight = function() {
      $mdSidenav('right').toggle();
    };

    // Default hard coded menu items for main menu
    var defaultMainMenu = [];

    // Query menus added by modules. Only returns menus that user is allowed to see.
    function queryMenu(name, defaultMenu) {

      Menus.query({
        name: name,
        defaultMenu: defaultMenu
      }, function(menu) {
        $scope.menus[name] = menu;
      });
    }

    // Query server for menus and check permissions
    queryMenu('main', defaultMainMenu);
    queryMenu('account', []);

    $scope.isCollapsed = false;

    $rootScope.$on('loggedin', function() {

      queryMenu('main', defaultMainMenu);

      $scope.global = {
        authenticated: !!$rootScope.user,
        user: $rootScope.user
      };
    });

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
