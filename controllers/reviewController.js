var _ = require('underscore');
var jwt = require("jsonwebtoken");
var mongoose = require('mongoose');
var config = require('../config/config.js');
var Review = mongoose.model('Review');

module.exports = {

    register: function (req, res) {
        var reqBody = req.body;
        if (!reqBody) {
            return res.status(400).send({error: "Body should not be empty"});
        }
        if (!reqBody.email) {
            return res.status(400).send({error: "Email is required"});
        }
        if (!reqBody.password) {
            return res.status(400).send({error: "Password is required"});
        }

        User.findOne({
            mobile: req.body.mobile
        }, function (err, existingUser) {
            if (err) {
                res.status(500).send({
                    type: false,
                    data: "Error occured: " + err
                });
            } else {
                if (existingUser) {
                    res.status(500).send({
                        type: false,
                        data: "Email already registered!"
                    });
                } else {
                    reqBody.username = reqBody.email;
                    var user = new User(reqBody);
                    user.save(function (err, user) {
                        if (err) {
                            res.send(500, err);
                        }
                        if (!err) {
                            res.send(user);
                        }
                    });
                }
            }
        });

    },

    saveReview: function (req, res) {

        var Review = new Review(req.body);
        Review.save(function (err, review) {
            if (err) {
                res.send(500, err);
            }
            if (review) {
                res.send({"message":"review successfully created"});
            }
        });
    }

};