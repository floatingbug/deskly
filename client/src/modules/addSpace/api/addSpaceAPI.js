import apiFetch from "@/api/apiFetch.js";

export default async function ({ newSpace }) {
    const path = "/spaces/add-space";
    const options = {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(newSpace),
    };

    const result = await apiFetch({
        path,
        options,
        addJwt: true,
    });

    return result;
}
