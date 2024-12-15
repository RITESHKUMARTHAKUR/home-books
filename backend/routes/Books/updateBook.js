const BookModel = require('../../models/Books');

const updateBook = async (req,res) => {

    const {_id, title,bookPublication,author,edition,
        pubDate,language,schoolName,subject,
        bookClass,price,discount,elementType,bookDesc,bookImg} = req.body;

    try {
        await BookModel.findByIdAndUpdate( _id , {
            title,bookPublication,author,edition,
            pubDate,language,schoolName,subject,
            bookClass,price,discount,elementType,bookDesc,bookImg
        },{new:true})
        .then( response => res.status(200).json(response));
    }
    catch (error) {
        res.status(400).send(error);
    }
}

module.exports = updateBook;