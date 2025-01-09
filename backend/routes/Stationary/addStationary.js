const StationaryModel = require('../../models/Stationaries');

const addStationary = async (req,res) => {
    const {title ,price ,author ,bookPublication ,
        pubDate ,edition ,language ,discount ,
        elementType ,bookDesc ,stationaryUrl } = req.body;
    try {
        const stationaryDoc = await StationaryModel.create({
            title ,price ,author ,bookPublication ,
            pubDate ,edition ,language ,discount ,
            elementType ,bookDesc ,stationaryUrl
        });
        res.status(200).json(stationaryDoc);
    } catch (error){
        res.status(400).json(error);
    }
}

module.exports = addStationary;