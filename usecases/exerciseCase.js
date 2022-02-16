const Exercises = require("../models/Exercises").model;


const get = async () => {
  const allExercises = await Exercises.find({}).exec();
  return allExercises;
};


const getById = async (id) => {
  const oneExercise = await Exercises.findById(id).exec();
  return oneExercise;
};


const create = async (workoutData) => {
  const {
    title,
    muscle,
    equipment,
    series,
    reps,
    rest,
    link,
    workoutComplement,
  } = workoutData;

  const workout = new Exercises({
    title,
    muscle,
    equipment,
    series,
    reps,
    rest,
    link,
    workoutComplement,
  });
  return await workout.save();
};


const updateWorkout = async (id, workoutData) => {
  return await Exercises.findByIdAndUpdate(id, workoutData);
}


const deleteWorkout = async (id) => {
    return Exercises.findByIdAndDelete(id)
}

module.exports = {
  get,
  create,
  getById,
  updateWorkout,
  deleteWorkout,
};