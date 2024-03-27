const SchoolModel = require('../../models/School');
// const fs = require('fs');

const addSchool = async (req,res) => {

    const {schoolName,location,area,district,
        schoolState,pincode,affilated,medium,schoolImg} = req.body;
    
    const schoolDoc = await SchoolModel.create({schoolName,location,area,district,
        schoolState,pincode,affilated,medium,schoolImg,
        elementType: "school",schoolStatus: 1
    });

    
    res.json(schoolDoc);
    // const {originalname,path} = req.file;
    // const parts = originalname.split('.');
    // const exten = parts[parts.length - 1];
    // const newPath = path+'.'+exten;
    // fs.renameSync(path,newPath);

    // const {schoolName,location,area,district,
    //     schoolState,pincode,affilated,medium} = req.body;
    
    // const schoolDoc = await SchoolModel.create({schoolName,location,area,district,
    //     schoolState,pincode,affilated,medium,schoolImg:newPath,
    //     elementType: "school",schoolStatus: 1
    // });

    
    // res.json(schoolDoc);

        // try {
    //     // await SchoolDoc.save();
    //     await SchoolModel.create({schoolName,location});
    //     res.status(200).json("School Added!");
    // }
    // catch (err) {
    //     res.status(400).json("Cannot add School!")
    // }
}

const getSchool = async (req,res) => {
    try {
        const schoolDoc = await SchoolModel.find();
        res.status(200).json(schoolDoc);
    }
    catch (err) {
        res.status(400).json("Cannot add School!")
    }
}

const getSchoolInfo = async (req,res) => {
    const schoolId = req.params.id;
    try {
        const schoolInfo = await SchoolModel.findOne({_id:schoolId});
        res.status(200).json(schoolInfo);
    }
    catch (err) {
        res.status(400).json("Cannot add School!")
    }
}

module.exports = {addSchool,getSchool,getSchoolInfo};