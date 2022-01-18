const users = require("../models/Users").model;
const encrypt = require("../lib/encrypt");
const MUUID = require("uuid-mongodb");

const get = async () => {
  const allUsers = await users.find({}).sort({createdAt:-1}).exec();
  return allUsers;
};

const getById = async (id) => {
  const oneUser = await users.findById(id).exec();
  return oneUser;
};
  
  
const create = async (userData) => {
  const { 
    userName, 
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

  const status = 1;
  const hash = await encrypt.hashPassword(password);

  const user = new users({
    uuid,
    userName,
    firstName,
    lastName,
    password: hash,
    age,
    birthDate,
    gender,
    email,
    status,
    mobileNumber,
    state,
    city,
    avatar,
    account
  });
  return await user.save();
};

const getByUsername = async (userName) => {
  return await users.findOne({ userName }).exec();
};

// ya no se necesita esta función aquí
const authenticate = async (user, password) => {
  const hash = user.password;
  return await encrypt.verifyPassword(password, hash);
};
  
const updateUser = async (id, userData) => {
  const {
    userName, 
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
  
  return await users.findByIdAndUpdate(id, {userName,
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
    avatar}).exec();  
};

const disableUser = async (id) => {
  
  const status = false
  //const hash = await encrypt.hashPassword(password);
  
  return await users.findByIdAndUpdate(id, {status}).exec();  
};

module.exports = {
  get,
  create,
  getById,
  updateUser,
  disableUser,
  getByUsername,
  authenticate,
};