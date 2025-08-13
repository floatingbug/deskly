export default function convertUtcTimeStringToLocalTimeString(utcTimeStr) {
    const [hours, minutes] = utcTimeStr.split(":").map(Number);

    const utcDate = new Date(Date.UTC(1970, 0, 1, hours, minutes));
    return utcDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    });
}
