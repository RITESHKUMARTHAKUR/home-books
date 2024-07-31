const BookListModel = require('../../models/BookList');

const addBookList = async (req,res) => {
    const { userName,userEmail,
        userContact,userAddress,
        bookListUrl } = req.body;
    try {
        const bookListDoc = await BookListModel.create({
            userName,userEmail,
            userContact,userAddress,
            bookListUrl,bookListStatus: 1
        });
        res.status(200).json(bookListDoc);
    } catch(error) {
        res.status(400).json(error);
    }

}
module.exports = addBookList;