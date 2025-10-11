export default function getUpcomingRevenue(bookings) {
	return bookings.futureBookings.reduce((acc, booking) => acc + booking.totalAmount, 0);
}
