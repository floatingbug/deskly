const apiRouter = require("express").Router();
const routers = require("./routers");


apiRouter.get("/spaces", routers.spacesRouter);


module.exports = apiRouter;
