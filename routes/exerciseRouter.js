const express = require("express");
const router = express.Router();
const exercise = require("../usecases/exerciseCase");
const authHandler = require("../middlewares/authHandler");


router.get("/", authHandler, async (req, res, next) => {
  try {
    const allExercises = await exercise.get();
    res.json({
      ok: true,
      message: "You want it, you get it!",
      payload: { allExercises },
    });
  } catch (err) {
    next(err);
  };
});


router.get("/:id", authHandler, async (req, res) => {
  try {
    const { id } = req.params;
    const workoutById = await exercise.getById(id);
    res.json({
      ok: true,
      message: "Workout found!",
      payload: workoutById,
    });
  } catch (err) {
    res.status(400).json({
      ok: false,
      message: "Ups! exercise not found...",
      error: err.message
    });
  }
});


router.post("/", authHandler, async (req, res)=> {
  try { 
    const workoutData = req.body;
    const workoutCreated = await exercise.create(workoutData);

    res.status(201).json({
      ok: true,
      message: "Workout created", 
      payload: workoutCreated,
    });
  } catch (err) {
    res.status(400).json({
      ok: false,
      message: "Workout can't be created",
      error: err.message
    });
  }
}); 


router.patch("/:id", authHandler, async (req, res) => {
  const workoutUpdated = await exercise.updateWorkout(req.params.id, req.body);
  res.json({
    ok: true,
    message: "Updated workout",
    payload: workoutUpdated,
  });
});


router.delete("/:id", authHandler, async (req, res) => {
  const workoutDeleted = await exercise.deleteWorkout(req.params.id);
  res.json({
    ok: true,
    message: "Deleted",
    payload: workoutDeleted
  });
});
  

module.exports = router;