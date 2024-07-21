const cartModel = require('../../models/Cart');

const getCart = async (req,res) => {
    const email = req.params.email;
    try {
        const cartDoc = await cartModel.find({userEmail: email}).sort({createdAt: -1});
        if (cartDoc){
            res.status(200).json(cartDoc);
        }else {
            res.status(400).json("No order Found!");
        }
        
    } catch (error) {
        res.status(400).json(error);
        
    }
}
module.exports = getCart;