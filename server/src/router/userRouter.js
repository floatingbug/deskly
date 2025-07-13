const router = require("express").Router();
const userController = require("@controller/user");
const authUser = require("@middleware/authUser");


router.get("/get-user-by-jwt", userController.getUserByJwt);
router.get("/bookings", authUser, userController.getBookings);


module.exports = router;
