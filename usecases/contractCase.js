const Contract = require("../models/Contracts").model;

const get = async () => {
  const allContracts = await Contract.find({})
  .populate("student")
  .populate("exersice")
  .populate("coach").exec();
  return allContracts;
};


const getById = async (id) => {
  const oneContract = await Contract.findById(id).exec();
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
  getById,
  create
};