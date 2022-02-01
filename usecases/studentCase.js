const students = require("../models/Students").model;
const encrypt = require("../lib/encrypt");


const get = async () => {
  const allStudents = await students.find({}).exec();
  return allStudents;
};


const create = async (studentData) => {
  const { 
    firstName, 
    lastName, 
    email,
    password, 
    healthGoal,
    workoutFrecuency,
    payment,
    paymentStatus,
    metricStystem,
    scoreCoach,
    height,
    weight,
    age,
    photoBody1,
    photoBody2,
    photoBody3
    } = studentData;
  const hash = await encrypt.hashPassword(password);
  const student = new students({ 
    firstName, 
    lastName, 
    email,
    password: hash, 
    healthGoal,
    workoutFrecuency,
    payment,
    paymentStatus,
    metricStystem,
    scoreCoach,
    height,
    weight,
    age,
    photoBody1,
    photoBody2,
    photoBody3
  });
  const savedStudent = await student.save();
  return savedStudent;
};


const updateStudent = async (id, studentData) => {
  return await students.findByIdAndUpdate(id, studentData, { new: true })
};


module.exports = {
  get,
  create,
  updateStudent
};