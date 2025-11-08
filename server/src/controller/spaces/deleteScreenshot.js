const response = require("@utils/response");
const spacesService = require("@services/spaces");


async function deleteScreenshot(req, res, next){
	try{
		const result = await spacesService.deleteScreenshot({
			imageName: req.body.imageName,
			spaceId: req.body.spaceId,
			userId: req.user._id,
		});

		response(res, result);
	}
	catch(error){
		next(error);
	}
}


module.exports = deleteScreenshot;
