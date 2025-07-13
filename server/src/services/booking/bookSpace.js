const bookingModel = require("@models/booking");
const {ObjectId} = require("@config/db");


async function bookSpace({booking, user}){
	// check if user has booked this space already
	try{
		const query = {
			userId: user._id,
			spaceId: booking.spaceId,
		};

		const result = await bookingModel.getBookings({query});

		if(result.length > 0){
			return {
				success: false,
				code: 400,
				errors: ["You have already booked this space."],
			};
		}
	}
	catch(error){
		throw error;
	}

	// book space
	try{
		const doc = {
			userId: user._id,
			...booking,
		};

		const result = await bookingModel.bookSpace({doc});

		return {
			success: true,
			code: 200,
			message: "Space has been booked.",
			data: result,
		};
	}
	catch(error){
		throw error;
	}
}


module.exports = bookSpace;
