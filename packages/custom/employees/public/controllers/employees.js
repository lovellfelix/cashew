'use strict';

/* jshint -W098 */
angular.module('mean.employees').controller('EmployeesController', ['$scope', 'Global', 'Employees',
  function($scope, Global, Employees) {
    $scope.global = Global;
    $scope.package = {
      name: 'employees'
    };
  }
]);
