var _ = require('underscore');
var jwt = require("jsonwebtoken");
var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = {

    register: function (req, res) {
        console.log(req.body);
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

        User.findOne({email: req.body.email}, function (err, existingUser) {
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
                            res.status(200).send({message:"Successfully Registered"});
                        }
                    });
                }
            }
        });

    },

    login: function (req, res) {

        if (!req.body.username) {
            return res.status(400).send({error: "Username is required"});
        }
        if (!req.body.password) {
            return res.status(400).send({error: "Password is required"});
        }
        User.findOne({username: req.body.username}, function (err, user) {
            if (err) {
                res.json({type: false, data: "Error occured: " + err});
            } else {
                console.log(user);
                user.comparePassword(req.body.password, function (err, isMatch) {
                    if (err) res.json({type: false, data: "Error occured: " + err});
                    console.log(req.body.password, isMatch); // -> Password123: true
                    if (isMatch) {
                        var token = jwt.sign(user, "12scxzc321932", {
                            expiresIn: 1440 // expires in 24 hours
                        });
                        console.log(token);
                        var record = {
                            tokenId: token,
                            user: user
                        };
                        record.user.password = undefined;
                        console.log(record);
                        if (user) {
                            res.status(200).send(record);
                        } else {
                            res.json({type: false, data: "Incorrect email/password"});
                        }
                    }
                });

            }
        });
    }

};