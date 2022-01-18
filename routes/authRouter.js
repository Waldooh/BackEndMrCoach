const express = require("express");
const jwt = require("../lib/jwt");
const users = require("../usecases/userCase");
const auth = require("../usecases/authCase");

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;
    const userCreated = await auth.signup(email, password, firstName, lastName);
    // console.log("usuario creado: ", userCreated)
    res.status(201).json({
      ok: true,
      message: "Signup successfully!",
      payload: {
        userCreated
      }
    });
  } catch (error) {
    res.status(401).json({
      ok: false,
      message: "Ups! something went wrong",
      error: error.message
    });
  }
});


router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const { userId, token } = await auth.login(email, password)

    res.status(200).json({
      ok: true,
      message: "Login successfully!",
      payload: {
        userId,
        token
      }
    });
  } catch (error) {
    res.status(401).json({
      ok: false,
      message: "Ups! something went wrong",
      error: error.message
    });
  }
});


module.exports = router;