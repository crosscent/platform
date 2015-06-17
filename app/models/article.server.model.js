'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Article Schema
 */
var ArticleSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Article name',
		trim: true
	},
	content: {
		type: String,
		default: '',
		trim: true
	},
	published: {
		type: Boolean,
		default: false
	},
	partner: {
		type: Schema.ObjectId,
		ref: 'User'
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

mongoose.model('Article', ArticleSchema);
