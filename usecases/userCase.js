const userDetail = require("../models/UserDetail").model;
// const User = require("../models/UserDetail");
const encrypt = require("../lib/encrypt");
const MUUID = require("uuid-mongodb");

const get = async () => {
    const allUsersDetail = await userDetail.find({}).sort({createdAt:-1}).exec();
    return allUsersDetail;
};

const getById = async (id) => {
    const oneUser = await userDetail.findById(id).exec();
    return oneUser;
};
  
  
const create = async (userData) => {
    const {userName, firstName, lastName, password, age, birthDate, gender, email, mobileNumber, state, city, avatar} = userData;
    const uuid = MUUID.v1();
    const today = new Date();
    const account = 1;
    const status = 1;
    const hash = await encrypt.hashPassword(password);

    const user = new userDetail({
        uuid,
        userName,
        firstName,
        lastName,
        password: hash,
        age,
        birthDate,
        gender,
        email,
        initialTime: today,
        status,
        mobileNumber,
        state,
        city,
        avatar,
        account
    });
    return await user.save();
};

const getByUsername = async (username) => {
    return await userDetail.findOne({ username }).exec();
};

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
        birthDay, 
        gender, 
        email,
        mobileNumber, 
        state, 
        city, 
        avatar
        } = userData;
  
    const hash = await encrypt.hashPassword(password);
  
    return await User.model.findByIdAndUpdate(id, {userName,
        firstName, 
        lastName, 
        password: hash, 
        age, 
        birthDay, 
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
  
    return await User.model.findByIdAndUpdate(id, {status}).exec();  
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