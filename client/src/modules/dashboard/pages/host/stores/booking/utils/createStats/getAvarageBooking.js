export default function getAverageBooking(bookings) {
	const totalRevenue = bookings.totalBookings.reduce((accumulator, booking) => {
		return accumulator + booking.totalAmount;
	}, 0);

	return bookings.totalBookings.length > 0 ? totalRevenue / bookings.totalBookings.length : 0;
}
