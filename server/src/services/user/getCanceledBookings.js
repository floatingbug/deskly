const userModel = require("@models/user");

async function getCanceledBookings({user}){
    try{
		const pipeline = [
			{
				$match: {
					userId: user._id,
				},
			},
			{
				$addFields: {
					spaceId: {
						$toObjectId: "$spaceId",
					},
				},
			},
			{
				$lookup: {
					from: "spaces",
					localField: "spaceId",
					foreignField: "_id",
					as: "space",
				}
			},
			{
				$unwind: {
					path: "$space",
					preserveNullAndEmptyArrays: true,
				},
			},
		];

        const result = await userModel.getCanceledBookings({pipeline});

        return {
            success: true,
            code: 200,
            message: "Sent canceled bookings.",
			data: result,
        };
    }
    catch(error){
        throw error;
    }
}

module.exports = getCanceledBookings;
