const response = require("@utils/response");
const bookingService = require("@services/booking");


async function getBookings(req, res, next){
	try{
		const result = await bookingService.getBookings({
			spaceId: req.query.spaceId,
		});

		response(res, result);
	}
	catch(error){
		next(error);
	}
}


module.exports = getBookings;
