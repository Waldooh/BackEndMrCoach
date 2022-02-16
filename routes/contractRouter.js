const express = require("express");
const router = express.Router();
const contract = require("../usecases/contractCase");
// const authHandler = require("../middlewares/authHandler");


router.get("/", async (req, res, next) => {
  try {
    const allContracts = await contract.get();
    res.json({
      ok: true,
      message: "You want it, you get it!",
      payload: { allContracts },
    });
  } catch (err) {
    next(err);
  };
});

router.post("/:id", async (req, res)=> {
  try { 
    const contractCreated = await contract.create(req.params.id, req.body.coach);

    res.status(201).json({ 
      ok: true,
      message: "Coach hired", 
      payload: contractCreated,
    });
  } catch (err) {
    res.status(400).json({
      ok: false,
      message: "Contract can't be created",
      error: err.message
    });
  }
}); 


module.exports = router;