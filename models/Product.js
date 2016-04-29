module.exports = function (mongoose) {
    "use strict";
    var Schema = mongoose.Schema;
    var ProductSchema = new Schema({
        productName: {
            type: String
        },
        description:{
            type: String
        },
        status: {
            type: String,
            default:"INACTIVE"
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
        categoryId:{type: mongoose.Schema.Types.ObjectId, ref: 'Category'},
        Reviews:[{type: mongoose.Schema.Types.ObjectId, ref: 'Review'}]
    }, {
        strict: false
    });

    var Product = mongoose.model('Product', ProductSchema);

    return Product;
};
