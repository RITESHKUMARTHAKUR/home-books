const mongoose = require('mongoose')
const promotionsModel = require('../../models/Promotion');

const getPromotions = async (req,res) => {
    try {
        const promotionsList = await promotionsModel.find();
        if(promotionsList){
            res.status(200).json(promotionsList);
        }else {
            res.status(404).json({"msg":"No Promotions Found!"});
        }
    } catch (error) {
        res.status(500).json(error);
    }
}
module.exports = getPromotions;