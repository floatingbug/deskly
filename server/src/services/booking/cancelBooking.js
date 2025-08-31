const {ObjectId} = require("@config/db");
const bookingModel = require("@models/booking");


async function cancelBooking({user, bookingId}){
	let booking = {};

	// get booking
	try{
		const query = {
			_id: new ObjectId(bookingId),
			userId: user._id,
		};

		const result = await bookingModel.getBookings({query});
		booking = result[0];
	}
	catch(error){
		throw error;
	}

	// store booking in canceledBookings
	try{
		const doc = {
			...booking,
		};

		const result = await bookingModel.addCanceledBooking({doc});
	}
	catch(error){
		throw error;
	}
	
	//delete booking from bookings
	try{
		const doc = {
			_id: new ObjectId(bookingId),
			userId: user._id,
		};

		const result = await bookingModel.deleteBooking({doc});
		
		return{
			success: true,
			code: 200,
			message: "Booking has been canceled.",
		};
	}
	catch(error){
		throw error;
	}
}


module.exports = cancelBooking;
