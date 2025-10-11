export default function getMonthlyRevenue(bookings) {
	const monthNames = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];
	const revenueByMonth = {};

	bookings.totalBookings.forEach((booking) => {
		const start = new Date(booking.startDate);
		const month = start.getMonth();
		const year = start.getFullYear();
		const key = `${year}-${month}`;

		if (!revenueByMonth[key]) {
			revenueByMonth[key] = {
				id: monthNames[month].toLowerCase(),
				label: monthNames[month],
				year,
				bookings: 0,
				revenue: 0,
			};
		}

		revenueByMonth[key].bookings += 1;
		revenueByMonth[key].revenue += booking.totalAmount;
	});

	return Object.values(revenueByMonth).sort((a, b) => {
		if (a.year === b.year) return monthNames.indexOf(a.label) - monthNames.indexOf(b.label);
		return a.year - b.year;
	});
}
