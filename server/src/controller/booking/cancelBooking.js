const response = require("@utils/response");
const bookingService = require("@services/booking");


async function cancelBooking(req, res, next){
	try{
		const result = await bookingService.cancelBooking({
			bookingId: req.body.bookingId,
			user: req.user,
		});

		response(res, result);
	}
	catch(error){
		next(error);
	}
}


module.exports = cancelBooking;
