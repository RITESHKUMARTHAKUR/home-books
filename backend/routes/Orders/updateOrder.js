const orderModel = require('../../models/Orders')

const updateOrder = async (req, res) => {
    const { orderId } = req.params;
    const { updateFieldValue } = req.body;
  
    try {
      const updatedObject = await orderModel.findByIdAndUpdate( {_id: orderId }, { orderStatus: updateFieldValue }, { new: true });
      res.status(200).json(updatedObject);

    } 
    catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
};
  
module.exports = updateOrder;