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
	images: [{
		link:String,
		descript:String
	}],
	excerpt: {
		type: String
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
	category: {
		type: Schema.ObjectId,
		ref: 'Category'
	},
	partner: {
		type: Schema.ObjectId,
		ref: 'Partner'
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
