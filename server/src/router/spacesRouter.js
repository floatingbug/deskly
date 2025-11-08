const spacesRouter = require("express").Router();
const spacesController = require("@controller/spaces");
const authUser = require("@middleware/authUser");
const multer = require("multer");


const upload = multer();


spacesRouter.get("/", spacesController.getSpaces);
spacesRouter.post("/add-space", authUser, upload.array("images"), spacesController.addSpace);
spacesRouter.patch("/update-space", authUser, spacesController.updateSpace);
spacesRouter.delete("/delete-space", authUser, spacesController.deleteSpace);
spacesRouter.patch("/update-screenshot-order", authUser, spacesController.updateScreenshotOrder);
spacesRouter.patch("/change-screenshot", authUser, upload.single("image"), spacesController.changeScreenshot);
spacesRouter.patch("/delete-screenshot", authUser, upload.single("image"), spacesController.deleteScreenshot);
spacesRouter.post("/add-screenshots", authUser, upload.array("images"), spacesController.addScreenshots);


module.exports = spacesRouter;
