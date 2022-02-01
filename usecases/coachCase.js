const coaches = require("../models/Coaches").model;
const encrypt = require("../lib/encrypt");


const get = async () => {
  const allCoaches = await coaches.find({}).sort({createdAt:-1}).exec();
  return allCoaches;
};

const getById = async (id) => {
  const oneCoach = await coaches.findById(id).exec();
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
  const coach = new coaches({ 
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

const updateCoach = async (id, coachData) => {
  return await coaches.findByIdAndUpdate(id, coachData, { new: true })
};

module.exports = {
  get,
  create,
  updateCoach
};