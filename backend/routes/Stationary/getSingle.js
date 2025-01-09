const stationeryModel = require("../../models/Stationaries");

const getSingle = async (req,res) => {
    const {id} = req.params;
    try{
        const bookDoc = await stationeryModel.findOne({_id: id});
        if(bookDoc){
            res.status(200).json(bookDoc);
        }
        else{
            res.status(400).json(bookDoc);
        }

    }  catch(error) {
        res.status(400).json(error);
    } 
}
module.exports = getSingle;
