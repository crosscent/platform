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
	images: {
		type: Array,
		default: [{title:'specialization1', icon: 'glyphicon-asterisk', descript: 'short descript'},],
		trim: true
	},
	description: {
		type: String,
		default: '',
		trim: true
	},
	specification: {
		type: Array,
		default: [{title:'specialization1', icon: 'glyphicon-asterisk', descript: 'short descript'}, {title:'specialization1', icon: 'glyphicon-asterisk', descript: 'short descript'}, {title:'specialization1', icon: 'glyphicon-asterisk', descript: 'short descript'}],
		trim: true
	},
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
