const ordersModel = require('../../models/Orders');

const getAllOrders = async (req,res) => {
    try {
        const ordersDoc = await ordersModel.find();
        res.status(200).json(ordersDoc);


    } catch (error) {
        res.status(400).json(error);
    }

}

module.exports = getAllOrders;