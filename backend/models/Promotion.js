const mongoose = require('mongoose');

const promotionsSchema = new mongoose.Schema({
    promotionTitle : {
        type: String,
        required : true
    },
    promotionImg : {
        type: String,
        required : true
    },
    promotionDesc : {
        type: String,
        required : true
    },
    promotionRedirect:  {
        type: String,
    },
    promotionStatus: {
        type:Boolean
    }

},{
    timestamps: true
});
const promotionsModel = mongoose.model('promotions',promotionsSchema);

module.exports = promotionsModel;