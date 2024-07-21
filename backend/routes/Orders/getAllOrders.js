const ordersModel = require('../../models/Orders');

const getAllOrders = async (req,res) => {
    try {
        const ordersDoc = await ordersModel.find().sort({createdAt: -1});
        res.status(200).json(ordersDoc);


    } catch (error) {
        res.status(400).json(error);
    }

}

module.exports = getAllOrders;