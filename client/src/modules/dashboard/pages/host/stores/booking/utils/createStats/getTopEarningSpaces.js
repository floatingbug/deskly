export default function getTopEarningSpaces(bookings, limit = 5) {
	const revenueBySpace = {};

	bookings.totalBookings.forEach((booking) => {
		const spaceName = booking.space?.name || "Unknown Space";

		if (!revenueBySpace[spaceName]) {
			revenueBySpace[spaceName] = 0;
		}
		revenueBySpace[spaceName] += booking.totalAmount;
	});

	return Object.entries(revenueBySpace)
		.map(([name, revenue]) => ({ name, revenue }))
		.sort((a, b) => b.revenue - a.revenue)
		.slice(0, limit);
}
