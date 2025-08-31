const bookSpace = require("./bookSpace");
const getBookings = require("./getBookings");
const deleteBooking = require("./deleteBooking");
const cancelBooking = require("./cancelBooking");
const getCanceledBookings = require("./getCanceledBookings");


module.exports = {
	bookSpace,
	getBookings,
	deleteBooking,
	cancelBooking,
	getCanceledBookings,
};
