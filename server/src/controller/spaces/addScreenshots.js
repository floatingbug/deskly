const spacesService = require("@services/spaces");
const response = require("@utils/response");


async function addScreenshots(req, res, next){
	try{
		const images = req.files;
		const spaceId = req.body.spaceId;

		const result = await spacesService.addScreenshots({
			spaceId,
			userId: req.user._id,
			images,
		});

		return response(res, result);
	}
	catch(error){
		next(error);
	}
}


module.exports = addScreenshots;
