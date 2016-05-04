var express = require('express');
var router = express.Router();
var config = require('../config/config.js');
var user = require('../controllers/userController.js');
var review = require('../controllers/reviewController.js');
var product = require('../controllers/productController.js');
var category = require('../controllers/categoryController.js');

/* user */
router.post('/user/register', user.register);
router.post('/user/login', user.login);

/* category */
router.get('/category/list', config.isAuthorized, category.listAllCategories);
router.post('/category/create', category.saveCategory);

/* product */
router.get('/product/list', product.getProducts);
router.post('/product/create', product.saveProduct);

/* review */
router.post('/review/create', review.saveReview);


module.exports = router;
