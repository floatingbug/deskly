const userModel = require("@models/user");
const {ObjectId} = require("@config/db");


async function getUserById({userId}){
	try{
		const filter = {
			_id: new ObjectId(userId),
		};

		const result = await userModel.getUserById({filter});

		const {password, ...userInformations} = result;

		return {
			success: true,
			code: 200,
			message: "Sent user informations",
			data: userInformations,
		};
	}
	catch(error){
		throw error;
	}
}


module.exports = getUserById;
