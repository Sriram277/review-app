var _ = require('underscore');
var jwt = require("jsonwebtoken");
var mongoose = require('mongoose');
var config = require('../config/config.js');
var Product = mongoose.model('Product');

module.exports = {

    getProductWithReviews: function (req, res) {
        console.log("dsfdsfds")
        Product.findOne(req.params.prodId).populate('reviews').exec(function (err, products) {
            if (err) {
                res.status(500).send({type: false, data: "Error occured: " + err});
            } else {
                res.json(products);
            }
        });

    },
    listAllProducts: function (req, res) {
        console.log("kew")
        Product.find({}, function (err, products) {
            console.log(err,products);
            if (err) {
                res.json({type: false, data: "Error occured: " + err});
            } else {
                res.json(products);
            }
        });
    },
    saveProduct: function(req,res){
        var product = new Product(req.body);
        product.save(function (err, product) {
            if (err) {
                res.send(500, err);
            }
            if (!err || product) {
                res.send(product);
            }
        });
    }



};