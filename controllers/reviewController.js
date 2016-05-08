var _ = require('underscore');
var mongoose = require('mongoose');
var Review = mongoose.model('Review');
var Product = mongoose.model('Product');
var Category = mongoose.model('Category');

module.exports = {

    saveReview: function (req, res) {
        var review = new Review(req.body);
        review.save(function (err, review) {
            if (err) {
                res.send(500, err);
            }
            if (review) {
                Product.findById(review.productId, function (err, product) {
                    product.reviews.push(review);
                    product.save(function (err, product) {
                        Category.findById(review.categoryId, function (err, category) {
                            category.reviews.push(review);
                            category.save(function (err, cat) {
                                res.json({status: 'success', message: "You have commented on this product"});
                            });
                        });
                    });
                });
            }
        });
    }

};