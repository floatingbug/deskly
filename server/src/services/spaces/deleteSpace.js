const spacesModel = require("@models/spaces");
const {ObjectId} = require("@config/db");


async function deleteSpace({spaceId, user}){
	try{
		const filter = {
			_id: new ObjectId(spaceId),
			creatorId: user._id,
		};

		const result = await spacesModel.deleteSpace({filter});

		return {
			success: true,
			code: 200,
			message: "Space has been deleted.",
		};
	}
	catch(error){
		throw error;
	}
}


module.exports = deleteSpace;
