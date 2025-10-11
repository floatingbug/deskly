import { ref, reactive } from "vue";
import fetchHostBookingsAPI from "./api/fetchHostBookingsAPI.js";
import fetchCanceledBookingsAPI from "./api/fetchCanceledBookingsAPI.js";
import createStats from "./utils/createStats/index.js";

const bookings = reactive({
	currentBookings: [],
	futureBookings: [],
	pastBookings: [],
	canceledBookings: [],
	selectedBooking: [],
	totalBookings: [],
});

const financialStats = reactive({
	totalRevenue: 0,
	monthlyRevenue: 0,
	upcomingRevenue: 0,
	lostRevenue: 0,
	topEarningSpaces: 0,
	avarageBooking: 0,
	occupancyRate: 0,
	growthRate: 0,
});

async function initializeBookingStore() {
	const fetchedBookings = await fetchHostBookingsAPI();
	const fetchedCanceledBookings = await fetchCanceledBookingsAPI();
	const today = new Date();

	/*
	 ************* set bookings *****************
	 */

	// total bookings
	bookings.totalBookings = fetchedBookings.data;

	// canceled bookings
	bookings.canceledBookings = fetchedCanceledBookings.data;

	// current bookings
	bookings.currentBookings = bookings.totalBookings.filter((booking) => {
		const start = new Date(booking.startDate);
		const end = new Date(booking.endDate);

		return start <= today && end >= today;
	});

	// future bookings
	bookings.futureBookings = bookings.totalBookings.filter((booking) => new Date(booking.startDate) > today);

	// past bookings
	bookings.pastBookings = bookings.totalBookings.filter((booking) => new Date(booking.endDate) < today);

	/*
	 *********** set financialStats ******************
	 */

	financialStats.avarageBooking = createStats.getAvarageBooking(bookings);
	financialStats.monthlyRevenue = createStats.getMonthlyRevenue(bookings);
	financialStats.upcomingRevenue = createStats.getUpcomingRevenue(bookings);
	financialStats.lostRevenue = createStats.getLostRevenue(bookings);
	financialStats.topEarningSpaces = createStats.getTopEarningSpaces(bookings);
	financialStats.occupancyRate = createStats.getOccupancyRate(bookings);
	financialStats.growthRate = createStats.getGrowthRate(bookings);
	financialStats.totalRevenue = createStats.getTotalRevenue(bookings);

	return;
}

export default function useBookingStore() {
	return {
		initializeBookingStore,
		bookings,
		financialStats,
	};
}
