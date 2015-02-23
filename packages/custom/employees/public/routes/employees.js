'use strict';

angular.module('mean.employees').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('employees example page', {
      url: '/employees/example',
      templateUrl: 'employees/views/index.html'
    });
  }
]);
