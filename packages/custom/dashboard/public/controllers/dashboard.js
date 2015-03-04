'use strict';

/* jshint -W098 */
angular.module('mean.dashboard').controller('DashboardController', ['$scope', 'Global', 'Dashboard',
  function($scope, Global, Dashboard) {
    $scope.global = Global;
    $scope.package = {
      name: 'dashboard'
    };
  }
]);


angular.controller('sample03Ctrl', function($scope, localStorageService) {
  var name = 'sample-03';
  var model = localStorageService.get(name);
  if (!model) {
    // set default model for demo purposes
    model = {
      title: 'Sample 03',
      structure: '6-6',
      rows: [{
        columns: [{
          styleClass: 'col-md-6',
          widgets: [{
            title: 'Description',
            type: 'markdown',
            config: {
              content: 'This sample uses a widget filter, to restrict the widget selection.'
            }
          }]
        }, {
          styleClass: 'col-md-6',
          widgets: [{
            title: 'Restangular',
            type: 'githubAuthor',
            config: {
              path: 'mgonto/restangular'
            }
          }]
        }]
      }]
    };
  }
  $scope.name = name;
  $scope.model = model;
  $scope.collapsible = false;

  // only allow github widgets
  $scope.widgetFilter = function(widget, type){
    return type.indexOf('github') >= 0 || type === 'markdown' || type === 'version';
  };

  $scope.$on('adfDashboardChanged', function(event, name, model) {
    localStorageService.set(name, model);
  });
});
