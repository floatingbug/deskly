const userModel = require("@models/user");


async function getHostSpaces({user}){
	try{
		const query = {
			creatorId: user._id,
		};

		const result = await userModel.getHostSpaces({query});

		return {
			success: true,
			code: 200,
			message: "Sent host spaces.",
			data: result,
		};
	}
	catch(error){
		throw error;
	}
}


module.exports = getHostSpaces;
