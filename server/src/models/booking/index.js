const bookSpace = require("./bookSpace");
const getBookings = require("./getBookings");
const deleteBooking = require("./deleteBooking");
const addCanceledBooking = require("./addCanceledBooking");
const getCanceledBookings = require("./getCanceledBookings");
const countBookings = require("./countBookings");


module.exports = {
	bookSpace,
	getBookings,
	deleteBooking,
	addCanceledBooking,
	getCanceledBookings,
	countBookings,
};
