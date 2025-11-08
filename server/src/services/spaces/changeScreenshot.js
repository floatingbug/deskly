const path = require("path");
const fs = require("fs");


async function changeScreenshot({image, imageName}){
	// delet image by imageName
	try{
		const imagePath = path.join(__dirname, "../../../public/space_images", imageName);
		await fs.promises.access(imagePath);
		await fs.promises.unlink(imagePath);
	}
	catch(error){
		throw error;
	}

	// add image with same name as the old image
	try{
		const destPath = path.join(__dirname, "../../../public/space_images", imageName);
		await fs.promises.writeFile(destPath, image.buffer);

		return {
			success: true,
			code: 200,
			message: "Screenshot has been replaced.",
		};
	}
	catch(error){
		throw error;
	}
}


module.exports = changeScreenshot;
