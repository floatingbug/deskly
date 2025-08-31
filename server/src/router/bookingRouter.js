const router = require("express").Router();
const bookingController = require("@controller/booking");
const authUser = require("@middleware/authUser");


router.post("/book-space", authUser, bookingController.bookSpace);
router.get("/get-bookings", authUser, bookingController.getBookings);
router.delete("/delete-booking", authUser, bookingController.deleteBooking);
router.patch("/cancel-booking", authUser, bookingController.cancelBooking);
router.get("/get-canceled-bookings", authUser, bookingController.getCanceledBookings);


module.exports = router;
