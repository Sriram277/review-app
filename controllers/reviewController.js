var _ = require('underscore');
var jwt = require("jsonwebtoken");
var mongoose = require('mongoose');
var config = require('../config/config.js');
var Review = mongoose.model('Review');
var Product = mongoose.model('Product');

module.exports = {

    saveReview: function (req, res) {
        var review = new Review(req.body);
        review.save(function (err, review) {
            if (err) {
                res.send(500, err);
            }
            if (review) {
                Product.findById(review.productId, function(err, product){
                    product.reviews.push(review);
                    product.save(function(err, product){
                        res.json({status: 'success', message: "You have commented on this product"});
                    }); //end product.save
                });
            }
        });
    }

};