const spacesModel = require("@models/spaces");
const {ObjectId} = require("@config/db");
const {randomUUID} = require("crypto");
const path = require("path");
const fs = require("fs");


async function addScreenshots({spaceId, userId, images}){
	let imagesMeta = null;

	// get imagesMeta
	try{
		const query = {
			_id: new ObjectId(spaceId),
			creatorId: userId,
		};

		const result = await spacesModel.getSpaceById({query});
		imagesMeta = result.imagesMeta;
	}
	catch(error){
		throw error;
	}

	// check if number of images + already stored images is less then 6
	try{
		if(imagesMeta.length + images.length >= 6){
			return {
				success: false,
				code: 404,
				errors: [`Only 5 screenshots are allowed. You can store ${5 - imagesMeta.length} more screenshots`],
			};
		}
	}
	catch(error){
		throw error;
	}
	
	// store images
	try{
		for(const [index, file] of images.entries()){
			const ext = path.extname(file.originalname);
			const newImageName = randomUUID() + ext;
			const filePath = path.join(__dirname, "../../../public/space_images", newImageName);
			
			await fs.promises.writeFile(filePath, file.buffer);

			imagesMeta.push({
				imageName: newImageName,
				imagePath: `/space_images/${newImageName}`,
				isCover: false,
				order: imagesMeta.length + 1,
			});

			if(imagesMeta.length === 1) imagesMeta[0].isCover = true;
		}
	}
	catch(error){
		throw error;
	}
	
	// set and replace imagesMeta
	try{
		const filter = {
			_id: new ObjectId(spaceId),
			creatorId: userId,
		}
		const update = {
			$set: {
				imagesMeta,
			}
		}

		const result = await spacesModel.replaceImagesMeta({filter, update});
	}
	catch(error){
		throw error;
	}

	return {
		success: true,
		code: 200,
		message: "ok",
		data: {
			imagesMeta, 
		},
	};
}


module.exports = addScreenshots;
