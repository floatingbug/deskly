export default function evalTotalAmount({ startDate, endDate, startTime, hourlyRate }) {
    const start = new Date(`${startDate}T${startTime}`);
    const end = new Date(`${endDate}T${startTime}`);

    const msPerDay = 1000 * 60 * 60 * 24;
    const numDays = Math.round((end - start) / msPerDay) + 1; // inkl. Start- & Enddatum

    const totalAmount = numDays * hourlyRate;

    return totalAmount;
}
