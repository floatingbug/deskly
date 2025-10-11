const {ObjectId} = require("@config/db");
const spacesModel = require("@models/spaces");


async function updateScreenshotOrder({imagesMeta, spaceId, userId}){
	try{
		const filter = {
			_id: new ObjectId(spaceId),
			creatorId: userId,
		};
		const doc = {
			$set: {
				imagesMeta: imagesMeta,
			},
		};

		const result = await spacesModel.updateScreenshotOrder({filter, doc});

		return {
			success: true,
			code: 200,
			message: "Screenshot order has been updated.",
		};
	}
	catch(error){
		throw error;
	}
}


module.exports = updateScreenshotOrder;
