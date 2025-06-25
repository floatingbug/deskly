const authRouter = require("express").Router();
const authController = require("@controller/auth");


authRouter.use("/register", authController.register);


module.exports = authRouter;
