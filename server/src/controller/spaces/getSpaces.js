const spacesService = require("@services/spaces");
const response = require("@utils/response");


async function getSpaces(req, res, next){
	try{
		const queries = req.query;
		let result = {};

		if(queries.spaceId) result = await spacesService.getSpaceById({spaceId: queries.spaceId})
		else result = await spacesService.getSpaces({queries});

		response(res, result);
	}
	catch(error){
		next(error);
	}
}


module.exports = getSpaces;
