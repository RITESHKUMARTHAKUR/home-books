const promotionModel = require('../../models/Promotion')

const deletePromotion = async (req,res) => {
    const { id } = req.body; 
    try {
        const deleteDoc = await promotionModel.findOne({_id: id});
        if(deleteDoc){
            deleteDoc.promotionStatus = !deleteDoc.promotionStatus;
            await deleteDoc.save();
            res.status(200).json(deleteDoc);
        }
        else{
            res.status(404).json({"msg": "Promotion not found!"})
        }

    } catch (error) {
        res.status(500).json(error);
    }
    
}
module.exports = deletePromotion;