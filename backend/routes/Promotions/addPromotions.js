const promotionSchema = require('../../models/Promotion');

const addPromotion = async (req,res) => {
    const {promotionTitle,promotionImg,promotionDesc,promotionRedirect} = req.body;
    try{
        const promotionsDoc = await promotionSchema.create({
            promotionTitle,
            promotionImg,
            promotionDesc,
            promotionRedirect,
            promotionStatus: 1
        });
        res.status(200).json(promotionsDoc);
    }catch(error) {
        res.status(400).json(error);
    }
    
}

module.exports = addPromotion;