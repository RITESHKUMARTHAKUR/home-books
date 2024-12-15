const bookModel = require('../../models/Books');


const deleteBook = async (req,res) => {
    const {id} = req.params;
    try {
        const result = await bookModel.deleteOne({_id:id});

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Book not found' });
        }
        
        res.status(200).json({ message: "Book deleted successfully", result});

    } catch (error) {
        console.log("Book not Found!",error);
        res.status(500).json({ message:"Failed to delete book!", error: error.message});
    }
}

module.exports = deleteBook;