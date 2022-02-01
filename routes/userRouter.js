const express = require("express");
const router = express.Router();
const users = require("../usecases/userCase");
const coaches = require("../usecases/coachCase");
const authHandler = require("../middlewares/authHandler");
// const coaches = require("../models/Coaches");

router.use(authHandler);

router.get("/", async (req, res, next) => {
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


router.get("/:id", async (req, res) => {
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
    const userData = req.body; // cambiar lógica para userChecked 
    const userChecked = await users.getByUsername(userData.userName);
    
    if(userChecked) {
      res.status(409).json({
        ok: false,
        message: "UserName already taken",
      });
    };

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


router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, email, account, } = req.body;
    
    let userChecked = await users.getById(id)
    let newUser = {}
    let queso = {}

    if(firstName) newUser = {...newUser, firstName}
    if(lastName) newUser = {...newUser, lastName}
    if(email) newUser = {...newUser, email}
  
    if(userChecked.account === "usuario") { 
  
      if(account && account !== "usuario") {
        newUser = {...newUser, account}
  
        if(newUser.account === "entrenador") {
          console.log("newUser: ", newUser)
          const coachCreated = await coaches.create(newUser);
          console.log("coach:",coachCreated)
          // con calmita crear en nuevo coach
        } else if (account === "alumno") {
          const studentCreated = await student.create(newUser);
          queso = {...queso, newUser: studentCreated};
        };
      };
      return coachCreated;
    };
    // let updatedUser = await coaches.get(id)
  
    let coachCreated = await coaches.updateCoach(id, newUser)
    
    res.status(200).json({
      ok: true,
      message: `User updated successfully!`,
      payload: { coach: coachCreated },
    });
  } catch(error) {
    console.error("algo salió mal",error)
  }

});




module.exports = router;