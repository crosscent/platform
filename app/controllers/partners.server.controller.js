'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Partner = mongoose.model('Partner'),
	Product = mongoose.model('Product'),
	_ = require('lodash');

/**
 * Create a Partner
 */
exports.create = function(req, res) {
	var partner = new Partner(req.body);
	partner.user = req.user;

	partner.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(partner);
		}
	});
};

/**
 * Show the current Partner
 */
exports.read = function(req, res) {
	res.jsonp(req.partner);
};

/**
 * Update a Partner
 */
exports.update = function(req, res) {
	var partner = req.partner ;

	partner = _.extend(partner , req.body);

	partner.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(partner);
		}
	});
};

/**
 * Delete an Partner
 */
exports.delete = function(req, res) {
	var partner = req.partner ;

	partner.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(partner);
		}
	});
};

/**
 * List of Partners
 */
exports.list = function(req, res) {
	Partner.find().sort('-created').populate('user', 'displayName').exec(function(err, partners) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(partners);
		}
	});
};

/**
 * Partner middleware
 */
exports.partnerByID = function(req, res, next, id) {
	Partner.findById(id).populate('user', 'displayName').exec(function(err, partner) {
		if (err) return next(err);
		if (! partner) return next(new Error('Failed to load Partner ' + id));
		req.partner = partner ;
		next();
	});
};

/**
 * Partner authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.partner.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};

/**
 * Product List middleware
 */
exports.productByPartner = function(req, res) {
	Product.where('partner', req.partner).exec(function(err, product) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(product);
		}
	});
};
