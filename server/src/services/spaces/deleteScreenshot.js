const fs = require("fs");
const path = require("path");
const spacesModel = require("@models/spaces");
const {ObjectId} = require("@config/db");


async function deleteScreenshot({imageName, spaceId, userId}){
	// delete image
	try{
		const filePath = path.join(__dirname, "../../../public/space_images", imageName);
		await fs.promises.access(filePath);
		await fs.promises.unlink(filePath);
	}
	catch(error){
		throw error;
	}

	// delete object from imagesMeta in db
	try{
		const filter = {
			_id: new ObjectId(spaceId),
			creatorId: userId,
		};
		const update = {
			$pull: {
				imagesMeta: {imageName},
			}
		}

		const result = await spacesModel.deleteImage({filter, update});
	}
	catch(error){
	}

	// get imagesMeta and set orders and isCover
	let space = null;

	try{
		const filter = {
			_id: new ObjectId(spaceId),
			creatorId: userId,
		};

		space = await spacesModel.getSpaceById({filter});

		space.imagesMeta.forEach((image, index) => image.order = index + 1);
		if(space.imagesMeta.length > 0) space.imagesMeta[0].isCover = true;
	}
	catch(error){
		throw error;
	}
	
	// replace updated imagesMeta
	try{
		const filter = {
			_id: new ObjectId(spaceId),
			creatorId: userId,
		};
		const update = {
			$set: {
				imagesMeta: space.imagesMeta
			}
		}

		const result = await spacesModel.replaceImagesMeta({filter, update});

		return {
			success: true,
			code: 200,
			message: "Screenshot has been deleted.",
			data: {
				imagesMeta: space.imagesMeta,
			}
		};
	}
	catch(error){
		throw error;
	}
}


module.exports = deleteScreenshot;
