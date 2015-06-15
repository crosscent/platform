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
exports.userList = function(req, res) {
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

/**
 * Show the current User
 */
exports.userRead = function(req, res) {
	res.jsonp(req.user);
};

/**
 * Update an User
 */
exports.userUpdate = function(req, res) {
	var user = req.user ;

	user = _.extend(user , req.body);

	user.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(user);
		}
	});
};

/**
 * User middleware
 */
exports.userByID = function(req, res, next, id) {
	User.findById(id).select('username roles').exec(function(err, user) {
		if (err) return next(err);
		if (! user) return next(new Error('Failed to load User ' + id));
		req.user = user ;
		next();
	});
};
