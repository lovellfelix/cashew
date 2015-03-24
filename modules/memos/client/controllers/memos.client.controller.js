'use strict';

// Memos controller
angular.module('memos').controller('MemosController', ['$scope', '$stateParams', '$location', 'Authentication', 'Memos',
	function($scope, $stateParams, $location, Authentication, Memos ) {
		$scope.authentication = Authentication;

		// Create new Memo
		$scope.create = function() {
			// Create new Memo object
			var memo = new Memos ({
				name: this.name
			});

			// Redirect after save
			memo.$save(function(response) {
				$location.path('memos/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Memo
		$scope.remove = function( memo ) {
			if ( memo ) { memo.$remove();

				for (var i in $scope.memos ) {
					if ($scope.memos [i] === memo ) {
						$scope.memos.splice(i, 1);
					}
				}
			} else {
				$scope.memo.$remove(function() {
					$location.path('memos');
				});
			}
		};

		// Update existing Memo
		$scope.update = function() {
			var memo = $scope.memo ;

			memo.$update(function() {
				$location.path('memos/' + memo._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Memos
		$scope.find = function() {
			$scope.memos = Memos.query();
		};

		// Find existing Memo
		$scope.findOne = function() {
			$scope.memo = Memos.get({ 
				memoId: $stateParams.memoId
			});
		};
	}
]);