const userService = require("@services/user");
const response = require("@utils/response");


async function getBookings(req, res, next){
	try{
		const result = await userService.getBookings({userId: req.user._id});

		response(res, result);
	}
	catch(error){
		next(error);
	}
}


module.exports = getBookings;
