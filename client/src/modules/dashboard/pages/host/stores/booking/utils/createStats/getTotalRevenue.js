export default function getTotalRevenue(bookings) {
	return bookings.totalBookings.reduce((accumulator, booking) => {
		accumulator += booking.totalAmount;

		return accumulator;
	}, 0);
}
