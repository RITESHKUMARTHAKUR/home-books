const stationarySchema = require('../../models/Stationaries')

const getNotebooks = async (req,res) => {
    try{
        const stationaryDoc = await stationarySchema.find({elementType: { $in: ["notebook"]}});
        res.status(200).json(stationaryDoc);
    }catch (error) {
        res.status(400).json(error);
    }
}
const getStationaries = async (req,res) => {
    try{
        const stationaryDoc = await stationarySchema.find({elementType: { $in: ["stationery"]}});
        res.status(200).json(stationaryDoc);
    }catch (error) {
        res.status(400).json(error);
    }
}
module.exports = {getNotebooks,getStationaries};