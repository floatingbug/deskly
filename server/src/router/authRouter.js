const authRouter = require("express").Router();
const authController = require("@controller/auth");


authRouter.use("/register", authController.register);
authRouter.use("/login", authController.login);


module.exports = authRouter;
