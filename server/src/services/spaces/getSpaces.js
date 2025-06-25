const spacesModel = require("@models/spaces");


async function getSpaces(){
	try{
		const result = await spacesModel.getSpaces();

		return {
			success: true,
			code: 200,
			message: "Sent spaces",
			data: result,
		};
	}
	catch(error){
		throw error;
	}
}


module.exports = getSpaces;
