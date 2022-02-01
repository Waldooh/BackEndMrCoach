const express = require("express");
const router = express.Router();
const students = require("../usecases/studentCase");
// const authHandler = require("../middlewares/authHandler");

// router.use(authHandler);

router.get("/", async (req, res, next) => {
  try {
    const allStudents = await students.get();
    res.json({
      ok: true,
      message: "Student Done!",
      payload: { allStudents },
    });
  } catch (err) {
    next(err);
  };
});


router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const studentById = await students.getById(id);

    res.json({
      ok: true,
      message: "Student found",
      payload: studentById,
    });
  } catch (err) {
    res.status(400).json({
      ok: false,
      message: "Ups! Pupil not found...",
      error: err.message
    });
  }
});


router.post("/", async (req, res)=> {
  try { 
    const studentData = req.body;
    const studentCreated = await students.create(studentData);

    res.status(201).json({ 
      ok: true,
      message: "New user created", 
      payload: studentCreated,
    });
  } catch (err) {
    res.status(400).json({
      ok: false,
      message: "Student can't be created",
      error: err.message
    });
  }
}); 


router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const newStudent = req.body;

    let student = await coaches.updateCoach(id, newStudent)
    
    res.status(200).json({
    ok: true,
    message: `Pupil updated successfully!`,
    payload: { pupil: student },
    });
  } catch(error) {
    console.error("algo salió mal",error)
  }
});


module.exports = router;