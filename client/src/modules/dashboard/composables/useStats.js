import {computed} from "vue";


export default function useStats({bookings}){
    const stats = computed(() => {
        const now = new Date();
        const chartLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        
        // generate monthly booking stats
        const monthlyCounts = bookings.value.reduce((acc, booking) => {
            const month = new Date(booking.startDate).toLocaleString('en', { month: 'short' });
            acc[month] = (acc[month] || 0) + 1;
            return acc;
        }, {});

        // create data for the chart component
        const chartDataTotal = chartLabels.map(label => typeof monthlyCounts[label] === "number" ? monthlyCounts[label] : 0);

        const bookingsPerMonth = {
            label: "Bookings per Month", 
            chartType: 'line',
            chartData: {
                labels: chartLabels,
                datasets: [
                    {
                        label: 'Bookings per Month',
                        data: chartDataTotal,
                        borderColor: '#3B82F6',
                        tension: 0.4,
                        fill: false
                    }
                ]
            }
        };

        const current = {
            count: {
                label: "Current",
                value: bookings.value.filter((b) => new Date(b.startDate) <= now && now <= new Date(b.endDate)).length,
            },
        };

        const upcoming = {
            count: {
                label: "Upcoming",
                value: bookings.value.filter((b) => new Date(b.startDate) > now).length,
            },
        };

        const past = {
            count: {
                label: "Past",
                value: bookings.value.filter((b) => new Date(b.endDate) < now).length,
            },
        };
        
        return { bookingsPerMonth, current, upcoming, past };
    });

    return {stats};
}
