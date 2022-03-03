const Routines = require("../models/Routines").model;
// const encrypt = require("../lib/encrypt");

const get = async () => {
  const allRoutines = await Routines.find({}).exec();
  return allRoutines;
};

const getById = async (id) => {
  return await Routines.findById(id).exec();
};
  
  
const create = async (routineData) => {
  const {
    title,
    coach,
    student,
    workout,
    group,
    start,
    end,
    days,
    pic,
    level,
    link,
    cardio,
    notes,
    status
    } = routineData;
    
  const routine = new Routines({
    title,
    coach,
    student,
    workout,
    group,
    start,
    end,
    days,
    pic,
    level,
    link,
    cardio,
    notes,
    status
  });
  return await routine.save();
};

const update = async (id, routineData) => {
  const {title,
    idUser,
    idCoach,
    initialDate,
    finishDate,
    typeRoutine,
    daysTraining,
    daysTrained,
    exercise,
    cardio,
    comments } = routineData;

  return await Routines.model.findByIdAndUpdate(id, {title,
    idUser,
    idCoach,
    initialDate,
    finishDate,
    typeRoutine,
    daysTraining,
    daysTrained,
    exercise,
    cardio,
    comments}).exec();
  
  };
 

const deleteRoutine = async (id) => {
  return Routines.findByIdAndDelete(id)
}

const updateByStatus = async (id) => {
  const status = false;
  return await Routines.model.findByIdAndUpdate(id, {status}).exec();

};
  

module.exports = {
  get,
  create,
  getById,
  update,
  updateByStatus,
  deleteRoutine
};