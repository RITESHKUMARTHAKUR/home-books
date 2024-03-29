const orderModel = require('../../models/Orders');

const getSingleOrder = async (req,res) => {
    const orderId = req.params.orderId;

    try{
        const orderDoc = await orderModel.findOne({_id: orderId});
        if (orderDoc){
            res.status(200).json(orderDoc);
        }else {
            res.status(400).json("No order Found!");
        }
    }catch(error){
        res.status(400).json(error);
    }
}

module.exports = getSingleOrder;