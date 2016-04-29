var _ = require('underscore');
var jwt = require("jsonwebtoken");
var mongoose = require('mongoose');
var config = require('../config/config.js');
var User = mongoose.model('User');

module.exports = {

    listAllCategories: function (req, res) {
        Category.find({}, function (err, user) {
            if (err) {
                res.json({type: false, data: "Error occured: " + err});
            } else {
                res.json(user);
            }
        });
    },
    saveCategory: function(req,res){
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