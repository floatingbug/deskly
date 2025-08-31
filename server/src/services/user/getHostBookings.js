const userModel = require("@models/user");
const {ObjectId} = require("@config/db");


async function getHostBookings({user}){
	// === get bookings via spaceIds === //
	let spaceIds = [];

	// get spaceIds
	try{
		const query = {
			creatorId: user._id,
		};

		const spaces = await userModel.getHostSpaces({query});

		if(spaces.length <= 0){
			return {
				success: false,
				code: 400,
				errors: ["You don't own any spaces."],
			};
		}

		spaceIds = spaces.map(space => String(space._id));
	}
	catch(error){
		throw error;
	}

	// get bookings
	try{
		const pipeline = [
			{
				$match: {
					spaceId: {
						$in: spaceIds,
					}
				}
			},
			{
				$addFields: {
					spaceIdObj: { $toObjectId: "$spaceId" }
				}
			},
			{
				$lookup: {
					from: "spaces",
					localField: "spaceIdObj",
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
			message: "Sent bookings",
			data: result,
		};
	}
	catch(error){
		throw error;
	}
}


module.exports = getHostBookings;
