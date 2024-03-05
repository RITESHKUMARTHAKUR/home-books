const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;


const logout = (req,res) => {
    const {token} = req.cookies;

    jwt.verify(token,secret,{}, (error,info) => {
        res.cookie('token', '').json(info);
    });
};


module.exports = logout;