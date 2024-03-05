const fs = require('fs');
const BookModel = require('../../models/Books');

const addBook = async (req,res) => {
    const {originalname,path} = req.file;
    const parts = originalname.split('.');
    const exten = parts[parts.length - 1];
    const newpath = path+'.'+exten ;
    fs.renameSync(path, newpath );

    const {title,author,edition,
        pubDate,language,schoolName,subject,
        bookClass,price,discount,bookDesc} = req.body;

    const bookDoc = await BookModel.create({
        title,author,edition,pubDate,language,schoolName,subject,
        bookClass,price,discount,bookDesc,
        bookImg: newpath,elementType:"book",bookStatus: 1
    });

    res.json(bookDoc);
    
}  

module.exports = addBook;  