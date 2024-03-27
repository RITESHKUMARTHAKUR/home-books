// const fs = require('fs');
const BookModel = require('../../models/Books');

const addBook = async (req,res) => {
    const {title,bookPublication,author,edition,
        pubDate,language,schoolName,subject,
        bookClass,price,discount,elementType,bookDesc,bookImg} = req.body;

    const bookDoc = await BookModel.create({
        title,bookPublication,author,edition,pubDate,language,schoolName,subject,
        bookClass,price,discount,bookDesc,
        bookImg,elementType,bookStatus: 1
    });

    res.json(bookDoc);
    // const {originalname,path} = req.file;
    // const parts = originalname.split('.');
    // const exten = parts[parts.length - 1];
    // const newpath = path+'.'+exten ;
    // fs.renameSync(path, newpath );

    // const {title,bookPublication,author,edition,
    //     pubDate,language,schoolName,subject,
    //     bookClass,price,discount,elementType,bookDesc} = req.body;

    // const bookDoc = await BookModel.create({
    //     title,bookPublication,author,edition,pubDate,language,schoolName,subject,
    //     bookClass,price,discount,bookDesc,
    //     bookImg: newpath,elementType,bookStatus: 1
    // });

    // res.json(bookDoc);
    
}  

module.exports = addBook;  