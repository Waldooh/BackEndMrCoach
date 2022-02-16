const routineRouter = require("./routineRouter");
const userRouter = require("./userRouter");
const authRouter = require("./authRouter");
// const routineDisable = require("./updateRoutine")
const exerciseRouter = require("./exerciseRouter");
const contractRouter = require("./contractRouter");

const apiRouter = (app) => {
    app.use("/routines", routineRouter);
    app.use("/user", userRouter);
    app.use("/auth", authRouter);
    app.use("/workout", exerciseRouter);
    app.use("/contract", contractRouter);
};


module.exports = apiRouter;
