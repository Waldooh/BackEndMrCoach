const express = require("express");
const router = express.Router()
const users = require("../usecases/userCase");
const authHandler = require("../middlewares/authHandler");

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


router.post("/", async (req, res, next)=> {
  try { 
    const userData = req.body; 
    const userCreated = await users.create(userData);

    res.status(201).json({ 
      ok: true,
      message: "New user created", 
      payload: userCreated,
    });
  } catch (err) {
    next(err);
  }
}); 


router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { 
    account, 
    accountDetails, 
    name, 
    lastName, 
    age, 
    birthDate, 
    gender, 
    email,
    initialTime,
    status,
    mobileNumber,
    state,
    city,
    avatar,
  } = req.body;
  
  let checkUser = await users.getById(id)
  let newUser = {}

  if(name) newUser = {...newUser, name}
  if(lastName) newUser = {...newUser, lastName}
  if(age) newUser = {...newUser, age}
  if(birthDate) newUser = {...newUser, birthDate}
  if(gender) newUser = {...newUser, gender}
  if(email) newUser = {...newUser, email}
  if(initialTime) newUser = {...newUser, initialTime}
  if(status) newUser = {...newUser, status}
  if(mobileNumber) newUser = {...newUser, mobileNumber}
  if(state) newUser = {...newUser, state}
  if(city) newUser = {...newUser, city}
  if(avatar) newUser = {...newUser, avatar}

    if(checkUser.account === 1) { 

      if(account && account !== 1) {
        newUser = {...newUser, account}

        if(account === 2) {
          const coachCreated = await coach.create(accountDetails);     
          updatedUser = {...updatedUser, accountDetails: coachCreated}
        } else if (account === 3) {
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