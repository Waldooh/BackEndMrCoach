const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const users = require("../models/Users").model;
// const encrypt = require("../lib/encrypt"); // Borrar
// const jwt = require("../lib/jwt"); // Borrar


const signup = async (email, password) => {
  const hashPassword = await bcrypt.hash(password, 10);
  return users.create({ email, password: hashPassword })
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