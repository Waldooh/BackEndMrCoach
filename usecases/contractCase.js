const Contract = require("../models/Contracts").model;

const get = async () => {
  const allContracts = await Contract.find({})
  .populate("student", {password: 0})
  // .populate("exersice")
  .populate("coach", {
    avatar: 0,
    password: 0
  }).exec();
  return allContracts;
};


const getOne = async (id) => {
  const oneContract = await Contract.find({coach: id})
  .populate("student")
  .populate("coach", {
    avatar: 0,
    password: 0
  }).exec();
  return oneContract;
};


const create = async (student, coach) => {
  const contract = new Contract({
    coach,
    student
  });
  return await contract.save();
};


module.exports = {
  get,
  getOne,
  create
};