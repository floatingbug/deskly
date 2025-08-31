const response = require("@utils/response");
const spacesService = require("@services/spaces");


async function deleteSpace(req, res, next){
	try{
		const result = await spacesService.deleteSpace({
			spaceId: req.body.spaceId,
			user: req.user,
		});

		response(res, result);
	}
	catch(error){
		next(error);
	}
}


module.exports = deleteSpace;
