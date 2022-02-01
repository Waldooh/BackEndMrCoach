const express = require("express");
const router = express.Router();
const coaches = require("../usecases/coachCase");
// const authHandler = require("../middlewares/authHandler");

// router.use(authHandler);

router.get("/", async (req, res, next) => {
  try {
    const allCoaches = await coaches.get();
    res.json({
      ok: true,
      message: "Coach Done!",
      payload: { allCoaches },
    });
  } catch (err) {
    next(err);
  };
});


router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const coachById = await coaches.getById(id);

    res.json({
      ok: true,
      message: "Coach found",
      payload: coachById,
    });
  } catch (err) {
    res.status(400).json({
      ok: false,
      message: "Ups! Coach not found...",
      error: err.message
    });
  }
});


router.post("/", async (req, res)=> {
  try { 
    const coachData = req.body;
    const coachCreated = await coaches.create(coachData);

    res.status(201).json({ 
      ok: true,
      message: "New user created", 
      payload: coachCreated,
    });
  } catch (err) {
    res.status(400).json({
      ok: false,
      message: "Coach can't be created",
      error: err.message
    });
  }
}); 


router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const newCoach = req.body;

    let Coach = await coaches.updateCoach(id, newCoach)
    
    res.status(200).json({
    ok: true,
    message: `Coach updated successfully!`,
    payload: { coach: Coach },
    });
  } catch(error) {
    console.error("algo salió mal",error)
  }
});


module.exports = router;