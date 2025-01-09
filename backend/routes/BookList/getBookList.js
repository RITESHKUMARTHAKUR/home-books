const bookListSchema = require('../../models/BookList');

const getBookList = async (req,res) => {
    try{
        const bookListDoc = await bookListSchema.find();
        res.status(200).json(bookListDoc);
    }catch (error) {
        res.status(400).json(error);
    }
}
module.exports = getBookList;