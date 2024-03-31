const cartModel = require('../../models/Cart');

const removeCart = async (req,res) => {
    const {productID,currentUser} = req.body;
    const productDoc = await cartModel.findOne({_id: productID});
    

   
    if(productDoc.userEmail === currentUser.email ){
        try{
            const deletedTask = await cartModel.deleteOne({_id:productID});
            
            if(deletedTask){
                res.status(200).json("Task Deleted!");
            }else{
                res.status(400).json("Unable to delete Task!");
            }

        }catch(error) {
            res.status(400).json(error);
        }
    }else{
        res.status(400).json("Product Not Found");
    }

}

module.exports = removeCart;