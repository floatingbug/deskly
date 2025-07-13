const response = require("@utils/response");
const bookingService = require("@services/booking");


async function bookSpace(req, res, next){
	try{
		const result = await bookingService.bookSpace({
			booking: req.body, 
			user: req.user
		});

		response(res, result);
	}
	catch(error){
		next(error);
	}
}


module.exports = bookSpace;
