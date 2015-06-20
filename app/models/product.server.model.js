'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Product Schema
 */
var ProductSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Product name',
		trim: true
	},
	images: [{
		link:String,
		descript:String
	}],
	description: {
		type: String,
		default: '',
		trim: true
	},
	specification: [{
		title:String,
		icon:String,
		descript:String
	}],
	created: {
		type: Date,
		default: Date.now
	},
	category: {
		type: Schema.ObjectId,
		ref: 'Category'
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Product', ProductSchema);
