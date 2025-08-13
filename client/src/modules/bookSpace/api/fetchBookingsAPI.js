import apiFetch from "@/api/apiFetch.js";

export default async function fetchBookingsAPI({ spaceId }) {
    const path = `/booking/get-bookings?spaceId=${spaceId}`;
    const options = {
        method: "GET",
        headers: {},
    };

    const result = await apiFetch({
        path,
        options,
        addJwt: true,
    });

    return result;
}
