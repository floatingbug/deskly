const bookingModel = require("@models/booking");
const {ObjectId} = require("@config/db");


async function deleteBooking({user, bookingId}){
	try{
		const doc = {
			userId: user._id,
			_id: new ObjectId(bookingId),
		};

		const result = await bookingModel.deleteBooking({doc});

		return {
			success: true,
			code: 200,
			message: "Booking has been canceled.",
		};
	}
	catch(error){
		throw error;
	}
}


module.exports = deleteBooking;
