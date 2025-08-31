const spacesModel = require("@models/spaces");


async function addSpace({user, space}){
	try{
		const doc = {
			...space,
			creatorId: user._id,
			createdAt: new Date(),
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
