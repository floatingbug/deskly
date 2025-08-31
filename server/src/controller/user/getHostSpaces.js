const userService = require("@services/user");
const response = require("@utils/response");


async function getHostSpaces(req, res, next){
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
		const result = await userService.getHostSpaces({
			user: req.user,
		});

		response(res, result);
	}
	catch(error){
		next(error);
	}
}


function validatePayload({user, payload}){
	const errors = [];

	if(user.role !== "host") errors.push("Only the host is allowed to access this spaces.");

	return errors;
}


module.exports = getHostSpaces;
