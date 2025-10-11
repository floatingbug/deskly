const response = require("@utils/response");
const spacesService = require("@services/spaces");


async function updateSpace(req, res, next){
	const errors = validateRequest({payload: req.body, user: req.user});

	if(errors.length > 0){
		return response(res, {
			success: false,
			code: 400,
			errors,
		});
	}

	const inputs = req.body.inputs;
	const amenities = req.body.amenities;
	const spaceId = req.body.spaceId;

	try{
		const result = await spacesService.updateSpace({
			inputs,
			amenities,
			spaceId,
			user: req.user,
		});

		response(res, result);
	}
	catch(error){
		next(error);
	}
}


function validateRequest({payload, user}){
	const errors = [];

	if(user.role !== "host") errors.push("Only hosts can update spaces.");

	return errors;
}


module.exports = updateSpace;
