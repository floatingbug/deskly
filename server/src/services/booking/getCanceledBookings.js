const {ObjectId} = require("@config/db");
const bookingModel = require("@models/booking");
const spaceModel = require("@models/spaces");


async function getCanceledBookings({user}){
	let spaceIds = [];

	// get spaces and store spaceIds
	try{
		const filter = {
			creatorId: user._id,
		};

		const result = await spaceModel.getSpaces({filter});


		if(result.spaces.length > 0) {
			spaceIds = result.spaces.map(space => space._id.toString());
		}
		else {
			return {
				success: false,
				code: 400,
				errors: ["No spaces found"],
			};
		}
	}
	catch(error){
		throw error;
	}

	// get canceled bookings
	try{
        const aggregation = [
            {
                $match: {
                    spaceId: { $in: spaceIds }  // spaceIds = Strings
                }
            },
            {
                $lookup: {
                    from: "spaces",
                    let: { spaceIdStr: "$spaceId" },
                    pipeline: [
                        {
                            $match: {
                                $expr: { $eq: [ { $toString: "$_id" }, "$$spaceIdStr" ] }
                            }
                        }
                    ],
                    as: "space"
                }
            },
            { $unwind: "$space" }
        ];
        
        const result = await bookingModel.getCanceledBookings({aggregation});

		return {
			success: true,
			code: 200,
			message: "Sent canceled bookings",
			data: result,
		};
	}
	catch(error){
		throw error;
	}
}


module.exports = getCanceledBookings;
