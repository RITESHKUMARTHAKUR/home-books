const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;
const User = require('../../models/User');

const profile = async (req,res) => {
    const {token} = req.cookies;
    jwt.verify(token,secret,{}, (error,info) => {
        if(error) res.status(500).json('No user!');
        res.json(info);
    }) 
};
const getProfile = async (req,res) => {
    const {token} = req.cookies;
    let userId = 0;

    jwt.verify(token, secret, {}, (error,info) => {
        if(error) throw error;
        userId = info.id;
    });
    const userInfo = await User.findOne({_id:userId})
    res.json(userInfo);
}

module.exports = {profile, getProfile};