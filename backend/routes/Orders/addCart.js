const cartModel = require('../../models/Cart');

const addCart = async (req,res) => {
    const {bookDetails,currentUser} = req.body;
    const {name,email,contact} = currentUser;
    try{
        const cartDoc = await cartModel.create({
            productDetails: bookDetails,
            userName: name,
            userEmail: email,
            userContact: contact,
            productQuantity: 1
        }); 
        if(cartDoc) {
            res.status(200).json(cartDoc);
        }else {
            res.status(400).json("Failed to add cart!");
        }

    }catch(error){
        res.status(400).json(error);
    }
}
module.exports = addCart;