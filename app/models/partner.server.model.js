'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Partner Schema
 */
var PartnerSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Partner name',
		trim: true
	},
	slogan: {
		type: String,
		default: '',
		trim: true
	},
	shortDescription: {
		type: String,
		default: '',
		trim: true
	},
	communication: {
		type: String,
		default: '',
		trim: true
	},
	country: {
		type: String,
		default: '',
		trim: true
	},
	city: {
		type: String,
		default: '',
		trim: true
	},
	specialization: {
		type: Array,
		default: [{title:'specialization1', icon: 'glyphicon-asterisk', descript: 'short descript'}, {title:'specialization1', icon: 'glyphicon-asterisk', descript: 'short descript'}, {title:'specialization1', icon: 'glyphicon-asterisk', descript: 'short descript'}],
		trim: true
	},
	logo: {
		type: String,
		default: '',
		trim: true
	},
	header: {
		type: String,
		default: '',
		trim: true
	},
	thumbnail: {
		type: String,
		default: '',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	updated: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Partner', PartnerSchema);
