const apiRouter = require("express").Router();
const routers = require("./routers");


apiRouter.use("/spaces", routers.spacesRouter);
apiRouter.use("/auth", routers.authRouter);
apiRouter.use("/user", routers.userRouter);
apiRouter.use("/booking", routers.bookingRouter);
apiRouter.use("/inbox", routers.inboxRouter);


module.exports = apiRouter;
