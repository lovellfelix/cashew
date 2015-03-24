'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	path = require('path'),
	mongoose = require('mongoose'),
	Memo = mongoose.model('Memo'),
	errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a Memo
 */
exports.create = function(req, res) {
	var memo = new Memo(req.body);
	memo.user = req.user;

	memo.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(memo);
		}
	});
};

/**
 * Show the current Memo
 */
exports.read = function(req, res) {
	res.jsonp(req.memo);
};

/**
 * Update a Memo
 */
exports.update = function(req, res) {
	var memo = req.memo ;

	memo = _.extend(memo , req.body);

	memo.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(memo);
		}
	});
};

/**
 * Delete an Memo
 */
exports.delete = function(req, res) {
	var memo = req.memo ;

	memo.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(memo);
		}
	});
};

/**
 * List of Memos
 */
exports.list = function(req, res) { Memo.find().sort('-created').populate('user', 'displayName').exec(function(err, memos) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(memos);
		}
	});
};

/**
 * Memo middleware
 */
exports.memoByID = function(req, res, next, id) { Memo.findById(id).populate('user', 'displayName').exec(function(err, memo) {
		if (err) return next(err);
		if (! memo) return next(new Error('Failed to load Memo ' + id));
		req.memo = memo ;
		next();
	});
};