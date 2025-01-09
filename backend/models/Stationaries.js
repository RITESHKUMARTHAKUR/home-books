const mongoose = require('mongoose');

const stationarySchema = new mongoose.Schema({
    title: String,
    price: Number,
    author: String,
    bookPublication: String,
    pubDate: String,
    edition: String,
    language: String,
    discount: Number,
    elementType: String,
    bookDesc: String,
    stationaryUrl: String
}, {
    timestamps: true,
});


const StationaryModel = mongoose.model('stationaries', stationarySchema);

module.exports = StationaryModel;