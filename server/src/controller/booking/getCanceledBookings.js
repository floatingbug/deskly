const response = require("@utils/response");
const bookingService = require("@services/booking");


async function getCanceledBookings(req, res, next){
	try{
		const result = await bookingService.getCanceledBookings({
			user: req.user,
		});

		response(res, result);
	}
	catch(error){
		next(error);
	}
}


module.exports = getCanceledBookings;
