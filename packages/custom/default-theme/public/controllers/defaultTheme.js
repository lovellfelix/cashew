'use strict';

/* jshint -W098 */
angular.module('mean.default-theme').controller('DefaultThemeController', ['$scope', 'Global', 'DefaultTheme',
  function($scope, Global, DefaultTheme) {
    $scope.global = Global;
    $scope.package = {
      name: 'default-theme'
    };
  }
]);
