import apiFetch from "@/api/apiFetch.js";

export default async function getUserAPI({ userId }) {
    const path = `/user/get-user-by-id?userId=${userId}`;
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
