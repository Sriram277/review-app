var _ = require('underscore');
var jwt = require("jsonwebtoken");
var mongoose = require('mongoose');
var config = require('../config/config.js');
var Category = mongoose.model('Category');

module.exports = {

    listAllCategories: function (req, res) {
        Category.find({}, function (err, categories) {
            if (err) {
                res.json({type: false, data: "Error occured: " + err});
            } else {
                res.json(categories);
            }
        });
    },
    saveCategory: function(req,res){
        var category = new Category(req.body);
        category.save(function (err, category) {
            if (err) {
                res.send(500, err);
            }
            if (!err || category) {
                res.send(category);
            }
        });
    }

};