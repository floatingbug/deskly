import {reactive, computed} from "vue";
import fetchBookings from "./api/fetchBookings.js";
import userKpis from "./utils/userKpis.js";


const bookings = reactive({
	totalBookings: [],
	currentBookings: [],
	futureBookings: [],
	pastBookings: [],
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
	if(!fetchedBookings.success) errors.push(...fetchedBookings.errors);

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
	

    // set currentBookings
    bookings.currentBookings = bookings.totalBookings.filter((booking) => {
        const start = new Date(booking.startDate);
        const end = new Date(booking.endDate);

        return start <= today && end >= today;
    });

    // set futureBookings
    bookings.futureBookings = bookings.totalBookings.filter((booking) => new Date(booking.startDate) > today);

    // set pastBbookings
    bookings.pastBookings= bookings.totalBookings.filter((booking) => new Date(booking.endDate) < today);

	console.log(bookings);
	console.log(kpis);

	return {success: true};
}


export default function useBookingStore(){
	return {
		bookings,
		initializeBookingStore,
		kpis,
	};
}
