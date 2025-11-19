const bookingModel = require("@models/booking");
const SUBSCRIPTION_LIMITS = require("@config/subscriptionLimits");


async function bookSpace({booking, user}){
	try{
		// check if user has reached booking limits (depends on subscriptionTier)
		// check if user has booked this space already
		const [ {limit, reached}, booked ] = await Promise.all([
			checkBookingLimits({ user }),
			isBooked({ user, spaceId: booking.spaceId })
		]);
		
		if(booked){
			return {
				success: false,
				code: 400,
				errors: ["You have already booked this space."],
			};
		}
		if(reached){
			return {
				success: false,
				code: 400,
				errors: [`Only ${limit} bookings are allowed with the ${user.subscriptionTier} subscription.`],
			};
		}

		// book space
		const result = await applyBooking({user, booking});
	}
	catch(error){
		throw error;
	}

	return {
		success: true,
		code: 200,
		message: "Space has been booked.",
	};
}


async function checkBookingLimits({user}){
	const limit = SUBSCRIPTION_LIMITS[user.subscriptionTier];

	const filter = {
		userId: user._id,
	};

	const result = await bookingModel.countBookings({filter});

	return {
		limit,
		reached: result >= limit,
	};
}

async function isBooked({user, spaceId}){
	const filter = {
		userId: user._id,
		spaceId,
	};

	const count = await bookingModel.countBookings({filter});

	return count > 0;
}

async function applyBooking({user, booking}){
	const doc = {
		userId: user._id,
		...booking,
	};

	const result = await bookingModel.bookSpace({doc});

	return result;
}


module.exports = bookSpace;
