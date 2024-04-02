const messageModel = require('../../models/Messages');

const getAllMessages = async (req,res) => {
    try {
        const messagesDoc = await messageModel.find();
        res.status(200).json(messagesDoc);
    } catch (error) {
        res.status(400).json(error);
    }

}
module.exports = getAllMessages;