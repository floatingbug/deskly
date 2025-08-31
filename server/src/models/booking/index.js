const bookSpace = require("./bookSpace");
const getBookings = require("./getBookings");
const deleteBooking = require("./deleteBooking");
const addCanceledBooking = require("./addCanceledBooking");
const getCanceledBookings = require("./getCanceledBookings");


module.exports = {
	bookSpace,
	getBookings,
	deleteBooking,
	addCanceledBooking,
	getCanceledBookings,
};
