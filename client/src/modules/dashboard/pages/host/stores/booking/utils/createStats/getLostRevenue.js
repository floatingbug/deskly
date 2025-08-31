export default function getLostRevenue(bookings) {
    return bookings.canceledBookings.reduce((acc, booking) => {
        const amount = Number(booking.totalAmount) || 0;
        return acc + amount;
    }, 0);
}
