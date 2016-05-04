module.exports = function (mongoose) {
    "use strict";
    var Schema = mongoose.Schema;
    var ReviewSchema = new Schema({
        review: {
            type: String
        },
        comments:{
            type: String
        },
        status: {
            type: String
        },
        ratings:{
            type:Number
        },
        image:{
            type: String
        },
        created_at: {
            type: Date,
            "default": Date.now
        },
        updated_at: {
            type: Date,
            "default": Date.now
        },
        userId:{type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        productId:{type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
        categoryId:{type: mongoose.Schema.Types.ObjectId, ref: 'Category'}
    }, {
        strict: false
    });

    var Review = mongoose.model('Review', ReviewSchema);

    return Review;
};
