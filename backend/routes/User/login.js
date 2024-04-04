const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const login = async (req,res) => {
    const {email,password} = req.body;
    const secret = process.env.SECRET;
    const UserDoc = await User.findOne({email});
    if(UserDoc === null){
        res.status(400).json("User Not Found!!");
    }else {
        const passOk = bcrypt.compareSync(password, UserDoc.password);
        if(passOk) {
            jwt.sign({email,id: UserDoc._id,accType: UserDoc.acctype}, secret ,{} , (error,token) => {
                if(error) throw error;
                res.cookie('token', token).json({
                    accType:UserDoc.acctype,
                    email,
                    name: UserDoc.name,
                    contact: UserDoc.contact,
                    address: UserDoc.address
                }).status(200);
            } )
            // res.status(200).json(passOk);
        }
        else { 
            res.status(400).json("Wrong Credentials!!");
        }   
    }
    
 
}


module.exports = login;