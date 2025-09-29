const spacesRouter = require("express").Router();
const spacesController = require("@controller/spaces");
const authUser = require("@middleware/authUser");
const multer = require("multer");


const upload = multer();


spacesRouter.get("/", spacesController.getSpaces);
spacesRouter.post("/add-space", authUser, upload.array("images"), spacesController.addSpace);
spacesRouter.patch("/update-space", authUser, spacesController.updateSpace);
spacesRouter.delete("/delete-space", authUser, spacesController.deleteSpace);


module.exports = spacesRouter;
