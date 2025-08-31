const spacesRouter = require("express").Router();
const spacesController = require("@controller/spaces");
const authUser = require("@middleware/authUser");


spacesRouter.get("/", spacesController.getSpaces);
spacesRouter.post("/add-space", authUser, spacesController.addSpace);
spacesRouter.patch("/update-space", authUser, spacesController.updateSpace);
spacesRouter.delete("/delete-space", authUser, spacesController.deleteSpace);


module.exports = spacesRouter;
