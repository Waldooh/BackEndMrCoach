const routineRouter = require("./routineRouter");
const userRouter = require("./userRouter");
const authRouter = require("./authRouter");
// const routineDisable = require("./updateRoutine")
// const alumnRouter = require("./alumnRouter");
// const coachRouter = require("./coachRouter");

const apiRouter = (app) => {
    app.use("/routines", routineRouter);
    app.use("/user", userRouter);
    app.use("/auth", authRouter);
    // app.use("/disabledRoutines", routineDisable)
    // app.use("/student", alumnRouter);
    // app.use("/coach", coachRouter);
};


module.exports = apiRouter;
