const mongoose = require('mongoose');


const messageSchema = new mongoose.Schema({
    userName : {
        type: String,
        required : true
    },
    userEmail : {
        type: String,
        required : true
    },
    userMessage : {
        type: String,
        required: true

    },
}, {
    timestamps:true
});

const messageModel = mongoose.model('messages',messageSchema);
module.exports = messageModel;