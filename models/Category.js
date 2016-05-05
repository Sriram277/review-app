module.exports = function (mongoose) {
    "use strict";
    var Schema = mongoose.Schema;
    var CategorySchema = new Schema({
        CategoryName: {
            type: String
        },
        description:{
            type: String
        },
        image:{
            type: String
        },
        status: {
            type: String,
            default:"INACTIVE"
        },
        created_at: {
            type: Date,
            "default": Date.now
        },
        updated_at: {
            type: Date,
            "default": Date.now
        },
        Products:[{type: mongoose.Schema.Types.ObjectId, ref: 'Product'}],
        Reviews:[{type: mongoose.Schema.Types.ObjectId, ref: 'Review'}]
    }, {
        strict: false
    });

    var Category = mongoose.model('Category', CategorySchema);

    return Category;
};
