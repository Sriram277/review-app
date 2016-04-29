var _ = require('underscore');
var jwt = require("jsonwebtoken");
var mongoose = require('mongoose');
var config = require('../config/config.js');
var Product = mongoose.model('Product');

module.exports = {

    getProducts: function (req, res) {
        Product.findOne({}).populate('reviews').exec(function (err, products) {
            if (err) {
                res.status(500).send({type: false, data: "Error occured: " + err});
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
    },

    login: function (req, res) {
        User.findOne({
            username: req.body.username,
            password: req.body.password
        }, function (err, user) {
            console.log(err, user);
            if (err) {
                res.json({type: false, data: "Error occured: " + err});
            } else {
                var token = jwt.sign(user, "12scxzc321932", {
                    expiresInMinutes: 1440 // expires in 24 hours
                });
                user.accessToken = token;
                if (user) {
                    res.status(200).send({user:user});
                } else {
                    res.json({type: false, data: "Incorrect email/password"});
                }
            }
        });
    }



};