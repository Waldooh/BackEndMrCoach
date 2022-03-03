const express = require("express");
const router = express.Router();
const routines = require("../usecases/routineCase");

router.get("/", async (req, res, next) => {
  try {
    const allRoutines = await routines.get()
    res.json({
      ok: true,
      message: "Done!",
      payload: { allRoutines },
    });
  } catch (err) {
    next(err)
  };
});

router.post ("/", async (req, res, next)=> {
  try { 
    const routineData = req.body; 
    const routineCreated = await routines.create(routineData);

    res.status(201).json({ 
      ok:true,
      message: "New routine created", 
      payload: routineCreated,
    });
  } catch (err) {
    next(err);
  }
}); 


router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const payload = await routines.getById(id);
  
    res.status(200).json({
      ok: true,
      message: "Done!",
      payload,
    });
  } catch (err) {
    next(err);
  }
});

// router.patch("/:id", async (request, response, next)=> {
//   try {
//     const { id } = request.params;
//     const routineData = request.body;
//     const routineUpdate = await routines.update(id, routineData); 
//     response.status(201).json({
//       ok: true,
//       message: "Routine updated successfully",
//       payload: {
//         user: routineUpdate,
//       }
//     })
//   } catch (error){
//     next (error);
//   }
// });

router.patch("/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const routineUpdated = await routines.updateByStatus(id);
    
    if (!routineUpdated) {
      res.status(500).json({
        ok: false,
        message: "Routine don't exist",
      });
    }
    res.status(201).json({
      ok: true,
      message: "Routine disable",
      payload: {
        product: routineUpdated,
      },
    });
  } catch (err) {
    next(err);
  }
});


router.delete("/:id", async (req, res) => {
  const routineDeleted = await routines.deleteRoutine(req.params.id);
  res.json({
    ok: true,
    message: "Deleted, it´s gone!",
    payload: routineDeleted
  });
});


module.exports = router;