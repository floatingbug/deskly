const userModel = require("@models/user");


async function getBookings({userId}){
	try{
		const pipeline = [
			{
				$match: {
					userId,
				}
			},
			{
				$addFields: {
					spaceObjectId: { $toObjectId: "$spaceId" }
				}
			},
			{
				$lookup: {
					from: "spaces",
					localField: "spaceObjectId",
					foreignField: "_id",
					as: "space",
				}
			},
			{
				$unwind: "$space",
			},
		];

		const result = await userModel.getBookings({pipeline});

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
