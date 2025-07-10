const router = require("express").Router();
const userController = require("@controller/user");


router.get("/get-user-by-jwt", userController.getUserByJwt);


module.exports = router;
