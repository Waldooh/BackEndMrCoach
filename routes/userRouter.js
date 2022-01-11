const express = require("express");
const router = express.Router()
const users = require("../usecases/userCase");
const authHandler = require("../middlewares/authHandler");
const coaches = require("../models/Coaches");

router.get("/", async (req, res, next) => {
  try {
    const allUsers = await users.get()
    res.json({
      ok: true,
      message: "Done!",
      payload: { allUsers },
    });
  } catch (err) {
    next(err)
  };
});


router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const userById = await users.getById(id)

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


router.use(authHandler);


router.post("/", async (req, res)=> {
  try { 
    const userData = req.body; 
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
  const { id } = req.params;
  const { 
    accountDetails, 
    firstName, 
    lastName, 
    age, 
    birthDate, 
    gender, 
    email,
    status,
    mobileNumber,
    state,
    city,
    avatar,
    account, 
  } = req.body;
  
  let userChecked = await users.getById(id)
  let newUser = {}

  if(firstName) newUser = {...newUser, firstName}
  if(lastName) newUser = {...newUser, lastName}
  if(age) newUser = {...newUser, age}
  if(birthDate) newUser = {...newUser, birthDate}
  if(gender) newUser = {...newUser, gender}
  if(email) newUser = {...newUser, email}
  if(status) newUser = {...newUser, status}
  if(mobileNumber) newUser = {...newUser, mobileNumber}
  if(state) newUser = {...newUser, state}
  if(city) newUser = {...newUser, city}
  if(avatar) newUser = {...newUser, avatar}

    if(userChecked.account === "usuario") { 

      if(account && account !== "usuario") {
        newUser = {...newUser, account}

        if(account === "entrenador") {
          console.log("newUser: ", newUser)
          const coachCreated = await coaches.create(accountDetails);     
          updatedUser = {...updatedUser, accountDetails: coachCreated}
        } else if (account === "alumno") {
          const studentCreated = await student.create(accountDetails);
          updatedUser = {...updatedUser, accountDetails: studentCreated};
        };
      };
    };

  let updatedUser = await users.updateUser(id, newUser)
  
  res.json({
    ok: true,
    message: `User updated successfully!`,
    payload: { updatedUser },
  });
});




module.exports = router;