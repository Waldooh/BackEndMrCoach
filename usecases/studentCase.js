const User = require("../models/Users").model;
const encrypt = require("../lib/encrypt");


const get = async () => {
  const allStudents = await User.find({}).exec();
  return allStudents;
};


const create = async (studentData) => {
  const { 
    healthGoal,
    workoutFrecuency,
    metricSystem,
    height,
    weight,
    age,
    gender,
    photoBody1,
    photoBody2,
    photoBody3
    } = studentData;
  const hash = await encrypt.hashPassword(password);
  const student = new User({ 
    firstName, 
    lastName, 
    email,
    password: hash, 
    healthGoal,
    workoutFrecuency,
    metricSystem,
    height,
    weight,
    age,
    gender,
    photoBody1,
    photoBody2,
    photoBody3
  });
  const savedStudent = await student.save();
  return savedStudent;
};


const updateStudent = async (studentData) => {
  console.log("student:", studentData)
  const {
    id,
    healthGoal,
    workoutFrecuency,
    metricSystem,
    height,
    weight,
    age,
    gender,
    payment,
    paymentStatus,
    scoreCoach,
    photoBody1,
    photoBody2,
    photoBody3 
    } = studentData;
  return await User.findByIdAndUpdate(id,
    { healthGoal,
      workoutFrecuency,
      metricSystem,
      height,
      weight,
      age,
      gender,
      payment,
      paymentStatus,
      scoreCoach,
      photoBody1,
      photoBody2,
      photoBody3 },
      { new: true }).exec();
  };


module.exports = {
  get,
  create,
  updateStudent
};