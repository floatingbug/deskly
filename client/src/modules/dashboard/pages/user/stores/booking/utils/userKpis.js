export default {
    // 1. Total Spendings
    getTotalSpendings(bookings) {
        return parseFloat(
            bookings.totalBookings.reduce((acc, b) => acc + b.totalAmount, 0).toFixed(2)
        );
    },

    // 2. Monthly Spendings
	getMonthlySpendings(bookings) {
		const allMonths = [
			"January", "February", "March", "April", "May", "June",
			"July", "August", "September", "October", "November", "December"
		];

		const monthMap = allMonths.reduce((acc, month) => {
			acc[month] = 0;
			return acc;
		}, {});

		bookings.totalBookings.forEach(b => {
			const date = new Date(b.startDate);
			const monthName = allMonths[date.getMonth()];
			monthMap[monthName] += b.totalAmount;
		});

		return allMonths.map(month => ({
			month,
			amount: parseFloat(monthMap[month].toFixed(2))
		}));
	},

    // 3. Number of Bookings
    getNumberOfBookings(bookings) {
        return bookings.totalBookings.length;
    },

    // 4. Average Booking Price
    getAverageBookingPrice(bookings) {
        if (bookings.totalBookings.length === 0) return 0;
        const total = this.getTotalSpendings(bookings);
        return parseFloat((total / bookings.totalBookings.length).toFixed(2));
    },

    // 5. Refunds & Cancellations
	getRefundsOverview(bookings) {
		const cancelled = bookings.totalBookings.filter(b => b.status === "cancelled").length;
		const completed = bookings.totalBookings.length - cancelled;

		return { cancelled, completed };
	},

    // 6. Top Booked Spaces
    getTopBookedSpaces(bookings, limit = 5) {
        const countBySpace = {};
        bookings.totalBookings.forEach(b => {
            const name = b.space?.name || "Unknown Space";
            if (!countBySpace[name]) countBySpace[name] = 0;
            countBySpace[name]++;
        });

        return Object.entries(countBySpace)
            .map(([name, count]) => ({ name, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, limit);
    },

    // 7. Average Booking Duration
    getAverageBookingDuration(bookings) {
        if (bookings.totalBookings.length === 0) return 0;
        const totalHours = bookings.totalBookings.reduce((acc, b) => acc + b.totalHours, 0);
        return parseFloat((totalHours / bookings.totalBookings.length).toFixed(2));
    },
};
