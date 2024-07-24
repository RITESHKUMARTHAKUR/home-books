const promotionsModel = require('../../models/Promotion');

const updatePromotion = async (req,res) => {
    const { promotionId } = req.params;
    const { promotionTitle,promotionImg,promotionDesc,promotionRedirect} = req.body;

    try {
        const updateDoc = await promotionsModel.findByIdAndUpdate({_id: promotionId}, {
            promotionTitle,
            promotionImg,
            promotionDesc,
            promotionRedirect,
        },{
            new: true
        });
        res.status(200).json(updateDoc);
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports = updatePromotion;