const express = require("express");
const jwt = require("../lib/jwt");
const users = require("../usecases/userCase");
const auth = require("../usecases/authCase");

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const { email, password, } = req.body;
    const userCreated = await auth.signup(email, password);
    // console.log("usuario creado: ", userCreated)
    res.json({
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
    // const user = await users.getByUsername(userName);
    // const payload = await auth.login(email, password);

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