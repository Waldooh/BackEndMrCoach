const express = require("express");
const jwt = require("jsonwebtoken");
const users = require("../usecases/userCase");
const auth = require("../usecases/authCase");

const router = express.Router();

router.post("/signup", async (req, res) => {
  
  const createToken = (id) => {
    return jwt.sign({ id }, process.env.SECRET, {expiresIn: "2d"})
  }

  try {
    const { email, password, firstName, lastName, account } = req.body;
    const userCreated = await auth.signup(email, password, firstName, lastName, account);
    // console.log("usuario creado: ", userCreated)
    const token = createToken(userCreated._id)
    res.status(201).json({
      ok: true,
      message: "Signup successfully!",
      payload: {
        userCreated,
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


router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const { userId, token, account } = await auth.login(email, password)

    res.status(200).json({
      ok: true,
      message: "Login successfully!",
      payload: {
        userId,
        token,
        account // <-- temporalmente para pruebas
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