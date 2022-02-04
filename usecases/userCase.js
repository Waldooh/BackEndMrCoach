const User = require("../models/Users").model;
const encrypt = require("../lib/encrypt");

const get = async () => {
  const allUsers = await User.find({}).sort({createdAt:-1}).exec();
  return allUsers;
};

const getById = async (id) => {
  const oneUser = await User.findById(id).exec();
  return oneUser;
};
  
  
const create = async (userData) => {
  const { 
    firstName, 
    lastName, 
    password, 
    age, 
    birthDate, 
    gender, 
    email, 
    mobileNumber, 
    state, 
    city, 
    avatar 
    } = userData;

  const hash = await encrypt.hashPassword(password);

  const user = new User({
    firstName,
    lastName,
    password: hash,
    age,
    birthDate,
    gender,
    email,
    mobileNumber,
    state,
    city,
    avatar,
    account
  });
  return await user.save();
};

const getByUsername = async (userName) => {
  return await User.findOne({ userName }).exec();
};

  
const updateUser = async (id, userData) => {
  const {
    firstName,
    lastName, 
    password, 
    age, 
    birthDate, 
    gender, 
    email,
    mobileNumber, 
    state, 
    city, 
    avatar
    } = userData;
  const hash = await encrypt.hashPassword(password);
  
  return await User.findByIdAndUpdate(id, 
    {
    firstName, 
    lastName, 
    password: hash, 
    age, 
    birthDate, 
    gender, 
    email,
    mobileNumber, 
    state, 
    city, 
    avatar
  }).exec();  
};

const disableUser = async (id) => {
  
  const status = false
  //const hash = await encrypt.hashPassword(password);
  
  return await User.findByIdAndUpdate(id, {status}).exec();  
};

module.exports = {
  get,
  create,
  getById,
  updateUser,
  disableUser,
  getByUsername,
};