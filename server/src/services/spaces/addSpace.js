const spacesModel = require("@models/spaces");
const path = require("path");
const {randomUUID} = require("crypto");
const fs = require("fs");


async function addSpace({user, space, images}){
	const storedFilePaths = [];

	// store images
	const destPath = path.join(__dirname, "../../../public/space_images");

	for(const file of images){
		const ext = path.extname(file.originalname);
		const newName = `${randomUUID()}${ext}`;
		const filePath = path.join(destPath, newName);

		await fs.promises.writeFile(filePath, file.buffer);

		storedFilePaths.push(`/space_images/${newName}`);
	}

	
	// add space to db
	try{
		const doc = {
			...space,
			creatorId: user._id,
			createdAt: new Date(),
			imageUrls: storedFilePaths,
		};

		const result = await spacesModel.addSpace({doc});

		return {
			success: true,
			code: 200,
			message: "Space has been added.",
		};
	}
	catch(error){
		throw error;
	}
}


module.exports = addSpace;
