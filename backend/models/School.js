const mongoose = require('mongoose')

const SchoolSchema = new mongoose.Schema({
    schoolName: {
        type: String,
    },
    location: {
        type: String,
    },
    area: {
        type: String,
    },
    district: {
        type: String,
    },
    schoolState: {
        type: String,
    },
    pincode: {
        type: Number,
    },
    affilated: {
        type: String,
    },
    medium: {
        type: String,
    },
    schoolImg: {
        type: String,
    },
    elementType:  {
        type: String
    },
    schoolStatus:{
        type: Boolean
    }

}, {
    timestamps: true,
});

const SchoolModel = mongoose.model('schools', SchoolSchema);

module.exports = SchoolModel;