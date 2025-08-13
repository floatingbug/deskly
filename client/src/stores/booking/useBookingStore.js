import { ref } from "vue";
import fetchHostBookingsAPI from "./api/fetchHostBookingsAPI.js";
import fetchCanceledBookingsAPI from "./api/fetchCanceledBookingsAPI.js";

const currentBookings = ref([]);
const futureBookings = ref([]);
const pastBookings = ref([]);
const canceledBookings = ref([]);
const selectedBooking = ref({});

async function initializeBookingStore() {
    const fetchedBookings = await fetchHostBookingsAPI();
    const fetchedCanceledBookings = await fetchCanceledBookingsAPI();
    const bookings = fetchedBookings.data;
    const today = new Date();

    // canceled bookings
    canceledBookings.value = fetchedCanceledBookings.data;

    // current bookings
    currentBookings.value = bookings.filter((booking) => {
        const start = new Date(booking.startDate);
        const end = new Date(booking.endDate);

        return start <= today && end >= today;
    });

    // future bookings
    futureBookings.value = bookings.filter((booking) => new Date(booking.startDate) > today);

    // past bookings
    pastBookings.value = bookings.filter((booking) => new Date(booking.endDate) < today);

    return;
}

export default function useBookingStore() {
    return {
        initializeBookingStore,
        currentBookings,
        futureBookings,
        pastBookings,
        canceledBookings,
        selectedBooking,
    };
}
