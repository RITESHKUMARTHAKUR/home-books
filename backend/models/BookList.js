const mongoose = require('mongoose');

const bookListSchema = new mongoose.Schema({
    userName: String,
    userEmail: String,
    userContact: Number,
    userAddress: String,
    bookListUrl: String,
    bookListStatus: Number
},{
    timestamps: true,
});

const bookListModel = mongoose.model('bookList',bookListSchema);

module.exports = bookListModel;