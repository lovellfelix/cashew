'use strict';

angular.module('mean.default-theme').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('defaultTheme example page', {
      url: '/defaultTheme/example',
      templateUrl: 'default-theme/views/index.html'
    });
  }
]);
