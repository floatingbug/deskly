const spacesModel = require("@models/spaces");
const {ObjectId} = require("@config/db");


async function updateSpace({inputs, amenities, spaceId, user}){
	try{
		const filter = {
			_id: new ObjectId(spaceId),
			creatorId: user._id,
		};
		const update = {
			$set: {
				...inputs,
				amenities,
			},
		};

		const result = await spacesModel.updateSpace({filter, update});

		return {
			success: true,
			code: 200,
			message: "Space has been updated",
		};
	}
	catch(error){
		throw error;
	}
}


module.exports = updateSpace;
