const userMessageModel = require('../../models/Messages');

const userMessage = async (req,res) => {
    const {userName,userEmail,userMessage} = req.body;
    try {
        const messageDoc = await userMessageModel.create({
            userName,userEmail,userMessage
        });
        res.status(200).json(messageDoc);

    } catch (error) {
        res.status(400).json(error);
        
    }
};
module.exports = userMessage;