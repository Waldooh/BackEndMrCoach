const express = require("express");
const router = express.Router();
const users = require("../usecases/userCase");
const coaches = require("../usecases/coachCase");
const students = require("../usecases/studentCase");
const authHandler = require("../middlewares/authHandler");


router.get("/", authHandler, async (req, res, next) => {
  try {
    const allUsers = await users.get();
    res.json({
      ok: true,
      message: "Done!",
      payload: { allUsers },
    });
  } catch (err) {
    next(err);
  };
});


router.get("/:id", authHandler, async (req, res) => {
  try {
    const { id } = req.params;
    const userById = await users.getById(id);
    res.json({
      ok: true,
      message: "User found",
      payload: userById,
    });
  } catch (err) {
    res.status(400).json({
      ok: false,
      message: "Ups! User not found...",
      error: err.message
    });
  }
});


router.post("/", async (req, res)=> {
  try { 
    const userData = req.body; // cambiar lógica para userCheck 
    const userCreated = await users.create(userData);

    res.status(201).json({ 
      ok: true,
      message: "New user created", 
      payload: userCreated,
    });
  } catch (err) {
    res.status(400).json({
      ok: false,
      message: "User can't be created",
      error: err.message
    });
  }
}); 


router.patch("/:id", authHandler, async (req, res) => {
  const { id } = req.params;
  try {
    let {
      firstName, 
      lastName, 
      email, 
      healthGoal, // <------ Student
      workoutFrecuency,
      metricSystem,
      height,
      weight,
      age,
      gender,
      photoBody1,
      photoBody2,
      photoBody3,
      mobileNumber, // <------ Coach
      birthDate,
      discipline,
      country,
      state, 
      city, 
      description,
      coments,
      avatar,
    } = req.body;
    let newUser = { id };
    let userCheck = await users.getById(id);
    
    console.log("User checked", userCheck)
    if(userCheck.account && userCheck.account === "alumno") {
      if(healthGoal) newUser = {...newUser, healthGoal}
      if(workoutFrecuency) newUser = {...newUser, workoutFrecuency}
      if(metricSystem) newUser = {...newUser, metricSystem}
      if(height) newUser = {...newUser, height}
      if(weight) newUser = {...newUser, weight}
      if(age) newUser = {...newUser, age}
      if(gender) newUser = {...newUser, gender}
      if(photoBody1) newUser = {...newUser, photoBody1}
      if(photoBody2) newUser = {...newUser, photoBody2}
      if(photoBody3) newUser = {...newUser, photoBody3}

      let studentUpdated = await students.updateStudent(newUser);

      res.status(202).json({
        ok: true,
        message: "Student updated successfully",
        payload: studentUpdated,
      });

    } else if(userCheck.account && userCheck.account === "entrenador") {
      if(birthDate) newUser = {...newUser, birthDate}
      if(mobileNumber) newUser = {...newUser, mobileNumber}
      if(discipline) newUser = {...newUser, discipline}
      if(country) newUser = {...newUser, country}
      if(state) newUser = {...newUser, state}
      if(city) newUser = {...newUser, city}
      if(gender) newUser = {...newUser, gender}
      if(description) newUser = {...newUser, description}
      if(coments) newUser = {...newUser, coments}
      if(avatar) newUser = {...newUser, avatar}

      let coachUpdated = await coaches.updateCoach(newUser);
      console.log("->",coachUpdated);
      res.status(202).json({
        ok: true,
        message: "Coach updated successfully",
        payload: coachUpdated,
      });
    }
  } catch(err) {
    res.json({
      ok: false,
      message: "New data can't be updated",
      error: err.message
    });
  };
});




module.exports = router;