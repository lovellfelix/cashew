'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Memo Schema
 */
var MemoSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Memo name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Memo', MemoSchema);