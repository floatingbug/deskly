const response = require("@utils/response");
const authUser = require("@middleware/authUser");
const spacesService = require("@services/spaces");


async function updateScreenshotOrder(req, res, next){
	const imagesMeta = req.body.imagesMeta;
	const spaceId = req.body.spaceId;

	try{
		const result = await spacesService.updateScreenshotOrder({
			imagesMeta,
			spaceId,
			userId: req.user._id,
		});

		response(res, result);
	}
	catch(error){
		next(error);
	}
}


module.exports = updateScreenshotOrder;
