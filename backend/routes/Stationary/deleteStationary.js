const stationaryModel = require('../../models/Stationaries');

const deleteSationary = async(req,res) => {
    const {id} = req.params;
    try {
        const result = await stationaryModel.deleteOne({_id:id});

        if (result.deletedCount === 0) {
            return res.status(404).json({message: 'Stationary not found'});
        }

        res.status(200).json({message:"Stationary deleted successfully", result});

    } catch (error) {
        console.log("Book not Found!", error);
        res.status(500).json({message: "Failed to delete book!", error: error.message});

    }
}

module.exports = deleteSationary;