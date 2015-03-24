'use strict';

module.exports = function(app) {
	var memos = require('../controllers/memos.server.controller');
	var memosPolicy = require('../policies/memos.server.policy');

	// Memos Routes
	app.route('/api/memos').all()
		.get(memos.list).all(memosPolicy.isAllowed)
		.post(memos.create);

	app.route('/api/memos/:memoId').all(memosPolicy.isAllowed)
		.get(memos.read)
		.put(memos.update)
		.delete(memos.delete);

	// Finish by binding the Memo middleware
	app.param('memoId', memos.memoByID);
};