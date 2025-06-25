const spacesRouter = require("express").Router();
const spacesController = require("@controller/spaces");


spacesRouter.use("/", spacesController.getSpaces);


module.exports = spacesRouter;
