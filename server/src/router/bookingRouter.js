const router = require("express").Router();
const bookingController = require("@controller/booking");
const authUser = require("@middleware/authUser");


router.post("/book-space", authUser, bookingController.bookSpace);
router.get("/get-bookings", authUser, bookingController.getBookings);


module.exports = router;
