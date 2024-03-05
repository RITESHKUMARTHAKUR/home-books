const UserModel = require("../../models/User");
const bcrypt = require("bcryptjs");

const signup = async (req, res) => {
  const { name, email, contact, password, acctype, address } = req.body;
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(password, salt);
  
  try {
    const UserDoc = await UserModel.create({
      name,
      email,
      contact,
      password: hash,
      acctype,
      address,
    });
    res.status(200).json(UserDoc);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = signup;
