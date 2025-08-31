const response = require("@utils/response");
const bookingService = require("@services/booking");


async function deleteBooking(req, res, next){
	try{
		const result = await bookingService.deleteBooking({user: req.user, bookingId: req.body.bookingId});

		response(res, result);
	}
	catch(error){
		next(error);
	}
}


module.exports = deleteBooking;
