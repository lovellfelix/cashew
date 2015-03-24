'use strict';

var should = require('should'),
	request = require('supertest'),
	path = require('path'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Memo = mongoose.model('Memo'),
	express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app, agent, credentials, user, memo;

/**
 * Memo routes tests
 */
describe('Memo CRUD tests', function() {
	before(function(done) {
		// Get application
		app = express.init(mongoose);
		agent = request.agent(app);

		done();
	});

	beforeEach(function(done) {
		// Create user credentials
		credentials = {
			username: 'username',
			password: 'password'
		};

		// Create a new user
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});

		// Save a user to the test db and create new Memo
		user.save(function() {
			memo = {
				name: 'Memo Name'
			};

			done();
		});
	});

	it('should be able to save Memo instance if logged in', function(done) {
		agent.post('/api/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Memo
				agent.post('/api/memos')
					.send(memo)
					.expect(200)
					.end(function(memoSaveErr, memoSaveRes) {
						// Handle Memo save error
						if (memoSaveErr) done(memoSaveErr);

						// Get a list of Memos
						agent.get('/api/memos')
							.end(function(memosGetErr, memosGetRes) {
								// Handle Memo save error
								if (memosGetErr) done(memosGetErr);

								// Get Memos list
								var memos = memosGetRes.body;

								// Set assertions
								(memos[0].user._id).should.equal(userId);
								(memos[0].name).should.match('Memo Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Memo instance if not logged in', function(done) {
		agent.post('/api/memos')
			.send(memo)
			.expect(403)
			.end(function(memoSaveErr, memoSaveRes) {
				// Call the assertion callback
				done(memoSaveErr);
			});
	});

	it('should not be able to save Memo instance if no name is provided', function(done) {
		// Invalidate name field
		memo.name = '';

		agent.post('/api/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Memo
				agent.post('/api/memos')
					.send(memo)
					.expect(400)
					.end(function(memoSaveErr, memoSaveRes) {
						// Set message assertion
						(memoSaveRes.body.message).should.match('Please fill Memo name');
						
						// Handle Memo save error
						done(memoSaveErr);
					});
			});
	});

	it('should be able to update Memo instance if signed in', function(done) {
		agent.post('/api/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Memo
				agent.post('/api/memos')
					.send(memo)
					.expect(200)
					.end(function(memoSaveErr, memoSaveRes) {
						// Handle Memo save error
						if (memoSaveErr) done(memoSaveErr);

						// Update Memo name
						memo.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Memo
						agent.put('/api/memos/' + memoSaveRes.body._id)
							.send(memo)
							.expect(200)
							.end(function(memoUpdateErr, memoUpdateRes) {
								// Handle Memo update error
								if (memoUpdateErr) done(memoUpdateErr);

								// Set assertions
								(memoUpdateRes.body._id).should.equal(memoSaveRes.body._id);
								(memoUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Memos if not signed in', function(done) {
		// Create new Memo model instance
		var memoObj = new Memo(memo);

		// Save the Memo
		memoObj.save(function() {
			// Request Memos
			request(app).get('/api/memos')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Memo if not signed in', function(done) {
		// Create new Memo model instance
		var memoObj = new Memo(memo);

		// Save the Memo
		memoObj.save(function() {
			request(app).get('/api/memos/' + memoObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', memo.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Memo instance if signed in', function(done) {
		agent.post('/api/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Memo
				agent.post('/api/memos')
					.send(memo)
					.expect(200)
					.end(function(memoSaveErr, memoSaveRes) {
						// Handle Memo save error
						if (memoSaveErr) done(memoSaveErr);

						// Delete existing Memo
						agent.delete('/api/memos/' + memoSaveRes.body._id)
							.send(memo)
							.expect(200)
							.end(function(memoDeleteErr, memoDeleteRes) {
								// Handle Memo error error
								if (memoDeleteErr) done(memoDeleteErr);

								// Set assertions
								(memoDeleteRes.body._id).should.equal(memoSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Memo instance if not signed in', function(done) {
		// Set Memo user 
		memo.user = user;

		// Create new Memo model instance
		var memoObj = new Memo(memo);

		// Save the Memo
		memoObj.save(function() {
			// Try deleting Memo
			request(app).delete('/api/memos/' + memoObj._id)
			.expect(403)
			.end(function(memoDeleteErr, memoDeleteRes) {
				// Set message assertion
				(memoDeleteRes.body.message).should.match('User is not authorized');

				// Handle Memo error error
				done(memoDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec(function(){
			Memo.remove().exec(function(){
				done();
			});
		});
	});
});
