const spacesRouter = require("express").Router();
const spacesController = require("@controller/spaces");


spacesRouter.get("/", spacesController.getSpaces);


module.exports = spacesRouter;
