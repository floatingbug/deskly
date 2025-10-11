const spacesModel = require("@models/spaces");
const path = require("path");
const {randomUUID} = require("crypto");
const fs = require("fs");


async function addSpace({user, space}){
	const images = space.images;
	const imagesMeta = space.imagesMeta;

	// store images
	const destPath = path.join(__dirname, "../../../public/space_images");

	for(const [index, file] of images.entries()){
		const ext = path.extname(file.originalname);
		const newName = `${randomUUID()}${ext}`;
		const filePath = path.join(destPath, newName);

		await fs.promises.writeFile(filePath, file.buffer);

		// set imagesMeta
		imagesMeta[index].imageName = newName;
		imagesMeta[index].imagePath = `/space_images/${newName}`;
	}
	
	// add space to db
	try{
		const doc = {
			...space.userInput,
			imagesMeta,
			creatorId: user._id,
			createdAt: new Date(),
		};

		const result = await spacesModel.addSpace({doc});

		return {
			success: true,
			code: 200,
			message: "Space has been added.",
			data: result,
		};
	}
	catch(error){
		throw error;
	}
}


module.exports = addSpace;
