const User = require("../models/Users").model;
const encrypt = require("../lib/encrypt");


const get = async () => {
  const allCoaches = await User.find({}).sort({createdAt:-1}).exec();
  return allCoaches;
};

const getById = async (id) => {
  const oneCoach = await User.findById(id).exec();
  return oneCoach;
};

const create = async (coachData) => {
  const { 
    firstName, 
    lastName, 
    email,
    password, 
    mobileNumber,
    discipline,
    state, 
    city, 
    avatar,
    paymentService,
    comments,
    scoreStudent,
    video1,
    video2,
    account
    } = coachData;
  const hash = await encrypt.hashPassword(password);
  const coach = new User({ 
    firstName, 
    lastName, 
    email,
    password: hash,
    mobileNumber,
    discipline,
    state, 
    city, 
    avatar,
    paymentService,
    comments,
    scoreStudent,
    video1,
    video2,
    account
  });
const savedCoach = await coach.save();
return savedCoach;
};

const updateCoach = async (coachData) => {
  console.log("coach:", coachData)
  const {
    id,
    mobileNumber,
    birthDate,
    discipline,
    country,
    state, 
    city, 
    description,
    coments,
    avatar,
  } = coachData;
  return await User.findByIdAndUpdate(id, 
    { mobileNumber,
    birthDate,
    discipline,
    country,
    state, 
    city, 
    description,
    coments,
    avatar }, 
    { new: true }).exec();
};

module.exports = {
  get,
  create,
  getById,
  updateCoach
};