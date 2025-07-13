const bookingModel = require("@models/booking");


async function getBookings({spaceId}){
	try{
		const query = {
			spaceId,
		};

		const result = await bookingModel.getBookings({query});

		return {
			success: true,
			code: 200,
			message: "Bookings have been sent.",
			data: result,
		};
	}
	catch(error){
		throw error;
	}
}


module.exports = getBookings;
