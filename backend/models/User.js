const mongoose = require('mongoose')
const {Schema} = mongoose;

const UserSchema = new Schema({
    name : {
        type: String,
        required: true,
        unique:true
    },
    email: {
        type: String,
        required: true,
    },
    contact : {
        type: String,
        required: true
    },
    password : {
        type: String,
        required: true
    },
    acctype : {
        type: Number,
        required: true
    },
    address : {
        type: String,
        required: true
    }
}, {
    timestamps: true,
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;