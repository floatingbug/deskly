const spacesModel = require("@models/spaces");
const {ObjectId} = require("@config/db");


async function getSpaceById({spaceId}){
	try{
		const query = {
			_id: new ObjectId(spaceId),
		};

		const result = await spacesModel.getSpaceById({query});

		return {
			success: true,
			code: 200,
			message: "Sent space.",
			data: result,
		};
	}
	catch(error){
		throw error;
	}
}


module.exports = getSpaceById;
