const stationarySchema = require('../../models/Stationaries')

const getStationary = async (req,res) => {
    try{
        const stationaryDoc = await stationarySchema.find({elementType: { $in: ["notebook", "stationery"]}});
        res.status(200).json(stationaryDoc);
    }catch (error) {
        res.status(400).json(error);
    }
}
module.exports = getStationary;