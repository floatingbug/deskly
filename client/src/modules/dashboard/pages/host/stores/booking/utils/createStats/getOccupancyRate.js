export default function getOccupancyRate(bookings) {
    const totalDays = bookings.totalBookings.reduce((acc, booking) => {
        const start = new Date(booking.startDate);
        const end = new Date(booking.endDate);
        const diff = (end - start) / (1000 * 60 * 60 * 24) + 1; // inkl. Starttag
        return acc + diff;
    }, 0);

    const bookedDays = bookings.totalBookings.length; // Vereinfachung

    const rate = totalDays > 0 ? (bookedDays / totalDays) * 100 : 0;

    return parseFloat(rate.toFixed(2)); // Zahl mit 2 Nachkommastellen
}
