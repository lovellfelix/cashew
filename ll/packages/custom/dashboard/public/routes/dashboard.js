'use strict';

angular.module('mean.dashboard').config(['$stateProvider',
  function($stateProvider) {

    // Check if the user is connected
    var checkLoggedin = function($q, $timeout, $http, $location) {
      // Initialize a new promise
      var deferred = $q.defer();

      // Make an AJAX call to check if the user is logged in
      $http.get('/loggedin').success(function(user) {
        // Authenticated
        if (user !== '0') $timeout(deferred.resolve);

        // Not Authenticated
        else {
          $timeout(deferred.reject);
          $location.url('/auth/login');
        }
      });

      return deferred.promise;
    };


    $stateProvider.state('dashboard example page', {
      url: '/dashboard/example',
      templateUrl: 'dashboard/views/index.html',
      resolve: {
        loggedin: checkLoggedin
      }
    })

    .state('dashboard', {
      url: '/dashboard',
      templateUrl: 'dashboard/views/default.html'
    })

    .state('dashboard test', {
      url: '/dashboard/:id',
      templateUrl: 'dashboard/views/dashboard.html'
    });


  }
]);
