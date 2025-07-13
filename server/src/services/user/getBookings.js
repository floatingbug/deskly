const userModel = require("@models/user");


async function getBookings({userId}){
	try{
		const aggregation = [
			{
				$match: {
				}
			},
			$lookup: {
				from: "bookings",

			}
		];

		const result = await userModel.getBookings({query});

		return {
			success: true,
			code: 200,
			message: "Sent bookings.",
			data: result,
		};
	}
	catch(error){
		throw error;
	}
}


module.exports = getBookings;
