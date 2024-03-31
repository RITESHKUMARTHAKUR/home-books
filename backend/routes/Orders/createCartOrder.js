const orderModel = require('../../models/Orders');
const userModel = require('../../models/User');

const createCartOrder = async (req,res) => {
    const {userDoc,selectedProducts,cartTotalNum} = req.body;
    const userDetails = await userModel.findOne({email:userDoc.email});
    if(userDetails){
        try {
            const cartOrderDoc = await orderModel.create({
                userName: userDoc.name,
                userEmail: userDoc.email,
                userAddress: userDoc.address,
                userContact: userDoc.contact,
                userId: userDoc._id,
                orderTotal: cartTotalNum,
                itemsCount: selectedProducts.length,
                orderProducts: selectedProducts,
                orderStatus: 1
            })
            res.status(200).json(cartOrderDoc);
        } catch (error) {
            res.status(400).json(error);
        }
    }
}

module.exports = createCartOrder;