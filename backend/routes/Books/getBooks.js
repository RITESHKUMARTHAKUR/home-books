const bookModel = require('../../models/Books');

const getBooks = async (req,res) => {
    try{
        const booksDoc = await bookModel.find();
        res.status(200).json(booksDoc);

    }catch(error) {
        res.status(400).json(error);
    }
}

module.exports = getBooks;