const apiRouter = require("express").Router();
const routers = require("./routers");


apiRouter.use("/spaces", routers.spacesRouter);
apiRouter.use("/auth", routers.authRouter);
apiRouter.use("/user", routers.userRouter);


module.exports = apiRouter;
