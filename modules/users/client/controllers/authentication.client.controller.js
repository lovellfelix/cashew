'use strict';

angular.module('users').controller('AuthenticationController', ['$scope', '$http', '$location', 'Authentication','LxNotificationService',
	function($scope, $http, $location, Authentication, LxNotificationService) {
		$scope.authentication = Authentication;

		// If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/');

		$scope.signup = function() {
			$http.post('/api/auth/signup', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;

				// And redirect to the index page
				$location.path('/');
			}).error(function(response) {
				$scope.error = response.message;

			});
		};

		$scope.signin = function() {
			$http.post('/api/auth/signin', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;

				// And redirect to the index page
				$location.path('/');
			}).error(function(response) {
				$scope.error = response.message;

				LxNotificationService.error(response.message);

				//TODO - notify to reset password if login fail after three attemps

			});
		};


		$scope.help = function() {
			LxNotificationService.confirm('Forget your password?', ' No worries! We can reset it for you.', { cancel:'Disagree', ok:'Agree' }, function(answer)
        {
            console.log(answer);

						if (answer === true) $location.path('/forgot');

        });


		};

	}
]);
