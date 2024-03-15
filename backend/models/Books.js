const mongoose = require('mongoose');


const bookSchema = new mongoose.Schema({
    title: String,
    bookPublication: String,
    author: String,
    edition: String,
    pubDate: String,
    language: String,
    schoolName: String,
    subject: String,
    bookClass: String,
    price: Number,
    discount: Number,
    bookDesc: String,
    bookImg: String,
    elementType: String,
    bookStatus: Boolean
}, {
    timestamps: true,
});


const BookModel = mongoose.model('books', bookSchema);

module.exports = BookModel;