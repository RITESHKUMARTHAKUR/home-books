const orderModel = require('../../models/Orders');

const getOrder = async (req,res) => {
    const email = req.params.email;

    try{
        const orderDoc = await orderModel.find({userEmail: email}).sort({createdAt: -1});
        if (orderDoc){
            res.status(200).json(orderDoc);
        }else {
            res.status(400).json("No order Found!");
        }
    }catch(error){
        res.status(400).json(error);
    }
}

module.exports = getOrder;