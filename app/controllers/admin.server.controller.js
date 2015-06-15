'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	errorHandler = require('./errors.server.controller.js'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	User = mongoose.model('User');

/**
 * List of Users
 */
exports.list = function(req, res) {
	User.find().sort('-created').select('created displayName').exec(function(err, user) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(user);
		}
	});
};
