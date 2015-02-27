
'use strict';

var app = angular.module('mean.default-theme', ['mean.system', 'ngMaterial']);

app.config(['$viewPathProvider', function($viewPathProvider) {
  $viewPathProvider.override('system/views/index.html', 'default-theme/views/homepage.html');
  $viewPathProvider.override('users/views/login.html', 'default-theme/views/auth/login.html');
  $viewPathProvider.override('users/views/register.html', 'default-theme/views/auth/register.html');
  $viewPathProvider.override('users/views/reset-password.html', 'default-theme/views/auth/reset-password.html');
  $viewPathProvider.override('users/views/forgot-password.html', 'default-theme/views/auth/forgot-password.html');
}]);

app.controller('DefaultThemeController', ['$scope', '$rootScope', '$mdSidenav', 'Global', 'Menus',
  function($scope, $rootScope, $mdSidenav, Global, Menus, DefaultTheme) {
    $scope.global = Global;
    $scope.menus = {};

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
        authenticated: !! $rootScope.user,
        user: $rootScope.user
      };
    });

  }
]);


app.controller('AppCtrl', ['$scope', '$mdSidenav', function($scope, $mdSidenav){
  $scope.toggleSidenav = function(menuId) {
    $mdSidenav(menuId).toggle();
  };

}]);
