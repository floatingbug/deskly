const userService = require("@services/user");
const response = require("@utils/response");


async function getHostBookings(req, res, next){
	const errors = validatePayload({user: req.user, payload: req.body});

	if(errors.length > 0){
		response(res, {
			success: false,
			code: 400,
			errors,
		});

		return;
	}

	try{
		const result = await userService.getHostBookings({user: req.user});

		response(res, result);
	}
	catch(error){
		next(error);
	}
}


function validatePayload({user, payload}){
	const errors = [];

	if(user.role !== "host") errors.push("Only the host can retrieve their bookings.");

	return errors;
}


module.exports = getHostBookings;
