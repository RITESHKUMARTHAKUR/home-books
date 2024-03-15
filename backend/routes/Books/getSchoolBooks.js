const bookModel = require('../../models/Books');

const getSchoolBooks = async (req,res) => {
    const schoolId = req.params.id;
    try {
        const schoolInfo = await bookModel.find({schoolName:schoolId});
        res.status(200).json(schoolInfo);
    }
    catch (err) {
        res.status(400).json("Cannot add School!")
    }
}

module.exports =  getSchoolBooks;