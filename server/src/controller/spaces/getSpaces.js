const spacesService = require("@services/spaces");
const response = require("@utils/response");


async function getSpaces(req, res, next){
	try{
		const result = await spacesService.getSpaces();

		response(res, result);
	}
	catch(error){
		next(error);
	}
}


module.exports = getSpaces;
