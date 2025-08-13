import apiFetch from "@/api/apiFetch.js";

export default async function updateSpaceAPI({ update, spaceId }) {
    const path = "/spaces/update-space";
    const options = {
        method: "PATCH",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify({
            update,
            spaceId,
        }),
    };

    const result = await apiFetch({
        path,
        options,
        addJwt: true,
    });

    return result;
}
