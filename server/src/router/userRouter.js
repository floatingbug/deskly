const router = require("express").Router();
const userController = require("@controller/user");
const authUser = require("@middleware/authUser");


router.get("/get-user-by-id", userController.getUserById);
router.get("/get-user-by-jwt", userController.getUserByJwt);
router.get("/bookings", authUser, userController.getBookings);
router.get("/get-host-spaces", authUser, userController.getHostSpaces);
router.get("/get-host-bookings", authUser, userController.getHostBookings);


module.exports = router;
