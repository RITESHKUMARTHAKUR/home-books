const { response } = require("express");
const StationaryModel = require("../../models/Stationaries")

const updateStationary = async (req,res) => {
    const {
        _id,title,bookPublication,author,edition,
        pubDate,language,price,discount,elementType,
        bookDesc,stationaryUrl}  = req.body;
    try {
        await StationaryModel.findByIdAndUpdate(_id,{
            title,bookPublication,author,edition,
            pubDate,language,price,discount,elementType,
            bookDesc,stationaryUrl
        },{new:true})
        .then( response => res.status(200).json(response) );
    }
    catch (error) {
        res.status(400).send(error);    
    }

}

module.exports = updateStationary;