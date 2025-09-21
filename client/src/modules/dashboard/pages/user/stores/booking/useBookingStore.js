import {reactive, computed} from "vue";
import fetchBookings from "./api/fetchBookings.js";
import fetchCanceledBookings from "./api/fetchCanceledBookings.js";
import userKpis from "./utils/userKpis.js";


const bookings = reactive({
	totalBookings: [],
	currentBookings: [],
	futureBookings: [],
	pastBookings: [],
	canceledBookings: [],
});

const kpis = reactive({
    totalSpendings: computed(() => userKpis.getTotalSpendings(bookings)),
    monthlySpendings: computed(() => userKpis.getMonthlySpendings(bookings)),
    numberOfBookings: computed(() => userKpis.getNumberOfBookings(bookings)),
    averageBookingPrice: computed(() => userKpis.getAverageBookingPrice(bookings)),
    topBookedSpaces: computed(() => userKpis.getTopBookedSpaces(bookings)),
    averageBookingDuration: computed(() => userKpis.getAverageBookingDuration(bookings)),
	refundsAndCancellations: computed(() => userKpis.getRefundsOverview(bookings))
});


async function initializeBookingStore(){
	/*
	 * fetch bookings
	 */
	
	let errors = [];

	// fetch bookings
	const fetchedBookings = await fetchBookings();
	const fetchedCanceledBookings = await fetchCanceledBookings();
	if(!fetchedBookings.success) errors.push(...fetchedBookings.errors);
	if(!fetchedCanceledBookings.success) errors.push(...fetchedCanceledBookings.errors);

	// return errors
	if(errors.length > 0){
		console.log(errors);
		return {
			success: false,
			errors: ["Fail to fetch bookings"],
		};
	}

	/*
	 * create bookings *
	 */
	
	const today = new Date();
	
	// set totalBookings
	bookings.totalBookings = fetchedBookings.data;

	// set canceledBookings
	bookings.canceledBookings = fetchedCanceledBookings.data;
	bookings.canceledBookings.forEach(booking => booking.type = "canceled");

    // set currentBookings
    bookings.currentBookings = bookings.totalBookings.filter((booking) => {
        const start = new Date(booking.startDate);
        const end = new Date(booking.endDate);

        return start <= today && end >= today;
    });
	bookings.currentBookings.forEach(booking => booking.type = "current");

    // set futureBookings
    bookings.futureBookings = bookings.totalBookings.filter((booking) => new Date(booking.startDate) > today);
	bookings.futureBookings.forEach(booking => booking.type = "future");

    // set pastBbookings
    bookings.pastBookings = bookings.totalBookings.filter((booking) => new Date(booking.endDate) < today);
	bookings.pastBookings.forEach(booking => booking.type = "past");

	return {success: true};
}


export default function useBookingStore(){
	return {
		bookings,
		initializeBookingStore,
		kpis,
	};
}
