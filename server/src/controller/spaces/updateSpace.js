const response = require("@utils/response");
const spacesService = require("@services/spaces");


async function updateSpace(req, res, next){
	const errors = validateRequest({payload: req.body, user: req.user});

	try{
		const result = await spacesService.updateSpace({
			spaceUpdate: req.body.update, 
			spaceId: req.body.spaceId,
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
