import apiFetch from "@/api/apiFetch.js";

export default async function contactHostAPI({ creatorId, message }) {
    const path = "/inbox/add-message";
    const options = {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify({ creatorId, message }),
    };

    const result = await apiFetch({
        path,
        options,
        addJwt: true,
    });

    return result;
}
