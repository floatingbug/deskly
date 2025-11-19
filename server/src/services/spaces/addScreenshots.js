const spacesModel = require("@models/spaces");
const {ObjectId} = require("@config/db");
const {randomUUID} = require("crypto");
const path = require("path");
const fs = require("fs");
const SUBSCRIPTION_LIMITS = require("@config/subscriptionLimits.js");


async function addScreenshots({spaceId, userId, images, user}){
	let imagesMeta = null;
	const limit = SUBSCRIPTION_LIMITS[user.subscriptionTier];

	try{
		// get imagesMeta
		imagesMeta = await getImagesMeta({spaceId, userId});

		// check if number of images + already stored images is less then 6
		const hasReachedLimits = await reachedLimits({imagesMeta, images, limit});
		if(hasReachedLimits){
			return {
				success: false,
				code: 400,
				errors: [`Only ${limit} screenshots are allowed with the ${user.subscriptionTier} subscription.`],
			};
		}
		
		// store images
		await storeImages({images, imagesMeta});
		
		// set and replace imagesMeta
		await replaceImagesMeta({spaceId, userId, imagesMeta});
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


async function getImagesMeta({spaceId, userId}){
	const query = {
		_id: new ObjectId(spaceId),
		creatorId: userId,
	};

	const result = await spacesModel.getSpaceById({query});

	return result?.imagesMeta || [];
}


async function reachedLimits({imagesMeta, images = [], limit}){
	return imagesMeta.length + images.length > limit;
}

async function storeImages({images, imagesMeta}){
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

async function replaceImagesMeta({spaceId, userId, imagesMeta}){
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


module.exports = addScreenshots;
