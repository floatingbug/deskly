export default function getGrowthRate(bookings) {
    // Monatsumsätze selbst berechnen (ohne import)
    const monthlyMap = {};
    
    bookings.totalBookings.forEach((booking) => {
        const date = new Date(booking.startDate);
        const month = date.toLocaleString("default", { month: "long" });
        const id = date.toLocaleString("default", { month: "long" }).toLowerCase();
        
        if (!monthlyMap[id]) {
            monthlyMap[id] = {
                id,
                label: month,
                bookings: [],
                revenue: 0,
            };
        }

        monthlyMap[id].bookings.push(booking);
        monthlyMap[id].revenue += booking.totalAmount;
    });

    const monthly = Object.values(monthlyMap);

    // Wachstumsrate berechnen
    if (monthly.length >= 2) {
        const last = monthly[monthly.length - 1];
        const prev = monthly[monthly.length - 2];
        if (prev.revenue > 0) {
            const growth = ((last.revenue - prev.revenue) / prev.revenue) * 100;
            return parseFloat(growth.toFixed(2)); // Zahl mit 2 Nachkommastellen
        }
        return 0;
    }

    return 0;
}

