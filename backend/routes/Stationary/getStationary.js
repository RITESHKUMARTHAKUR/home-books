const booksSchema = require('../../models/Books')

const getStationary = async (req,res) => {
    try{
        const stationaryDoc = await booksSchema.find({elementType: { $in: ["noteBook", "stationery"]}});
        res.status(200).json(stationaryDoc);
    }catch (error) {
        res.status(400).json(error);
    }
}
module.exports = getStationary;