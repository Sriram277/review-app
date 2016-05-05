module.exports = function (mongoose) {
    "use strict";
    var Schema = mongoose.Schema;
    var usersSchema = new Schema({
        email: {
            unique: true,
            required: true,
            type: String
        },
        password: String,
        username: {
            type:String,
            unique: true
        },
        mobile: {
            type: String
        },
        user_role: String,
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
        }
    }, {
        strict: false
    });

    var User = mongoose.model('User', usersSchema);

    return User;
};
