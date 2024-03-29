const orderModel = require('../../models/Orders');
const userModel = require('../../models/User');
// const jwt = require('jsonwebtoken');
// const secret = process.env.SECRET;

const createOrder = async (req,res) => {
    const {userDoc,selectedArray,orderTotal} = req.body;

    const userDetails = await userModel.findOne({email:userDoc.email});
    if(userDetails) {
        try {
            const orderDoc = await orderModel.create({
                userName: userDoc.name,
                userEmail: userDoc.email,
                userAddress: userDoc.address,
                userContact: userDoc.contact,
                userId: userDetails._id,
                orderTotal: orderTotal,
                itemsCount: selectedArray.length,
                orderProducts: selectedArray,
                orderStatus: 1
            });
            res.status(200).json(orderDoc);
        } catch (error) {
            res.status(400).json(error);
        }
    }
    
}   

module.exports = createOrder;