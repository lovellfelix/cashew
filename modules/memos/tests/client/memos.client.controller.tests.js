'use strict';

(function() {
	// Memos Controller Spec
	describe('Memos Controller Tests', function() {
		// Initialize global variables
		var MemosController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Memos controller.
			MemosController = $controller('MemosController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Memo object fetched from XHR', inject(function(Memos) {
			// Create sample Memo using the Memos service
			var sampleMemo = new Memos({
				name: 'New Memo'
			});

			// Create a sample Memos array that includes the new Memo
			var sampleMemos = [sampleMemo];

			// Set GET response
			$httpBackend.expectGET('api/memos').respond(sampleMemos);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.memos).toEqualData(sampleMemos);
		}));

		it('$scope.findOne() should create an array with one Memo object fetched from XHR using a memoId URL parameter', inject(function(Memos) {
			// Define a sample Memo object
			var sampleMemo = new Memos({
				name: 'New Memo'
			});

			// Set the URL parameter
			$stateParams.memoId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/api\/memos\/([0-9a-fA-F]{24})$/).respond(sampleMemo);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.memo).toEqualData(sampleMemo);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Memos) {
			// Create a sample Memo object
			var sampleMemoPostData = new Memos({
				name: 'New Memo'
			});

			// Create a sample Memo response
			var sampleMemoResponse = new Memos({
				_id: '525cf20451979dea2c000001',
				name: 'New Memo'
			});

			// Fixture mock form input values
			scope.name = 'New Memo';

			// Set POST response
			$httpBackend.expectPOST('api/memos', sampleMemoPostData).respond(sampleMemoResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Memo was created
			expect($location.path()).toBe('/memos/' + sampleMemoResponse._id);
		}));

		it('$scope.update() should update a valid Memo', inject(function(Memos) {
			// Define a sample Memo put data
			var sampleMemoPutData = new Memos({
				_id: '525cf20451979dea2c000001',
				name: 'New Memo'
			});

			// Mock Memo in scope
			scope.memo = sampleMemoPutData;

			// Set PUT response
			$httpBackend.expectPUT(/api\/memos\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/memos/' + sampleMemoPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid memoId and remove the Memo from the scope', inject(function(Memos) {
			// Create new Memo object
			var sampleMemo = new Memos({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Memos array and include the Memo
			scope.memos = [sampleMemo];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/api\/memos\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleMemo);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.memos.length).toBe(0);
		}));
	});
}());