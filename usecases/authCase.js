const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const users = require("../models/Users").model;


const signup = async (email, password, firstName, lastName) => {
  const hashPassword = await bcrypt.hash(password, 10);
  return users.create({ email, password: hashPassword, firstName, lastName })
}

const login = async (email, password) => {
  const userFound = await users.findOne({ email: email })
    if(!userFound) throw new Error("Verifica usuario y/o contraseña")
  
  const hash = userFound.password;

  const isValidPassword = await bcrypt.compare(password, hash);
    if(!isValidPassword) throw new Error("Verifica usuario y/o contraseña")

  const token = jwt.sign({ 
    userId: userFound._id,
    userName: userFound.userName,
    userAccount: userFound.account
  }, process.env.SECRET)
  return { 
    userName: userFound.userName,
    userId: userFound._id,
    account: userFound.account,
    token: token
  }
};


module.exports = {
  login,
  signup
};