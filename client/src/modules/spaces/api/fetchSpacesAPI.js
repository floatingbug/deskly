import apiFetch from "@/api/apiFetch.js";

export default async function fetchSpacesAPI({ query }) {
    const path = `/spaces?${query}`;
    const options = {
        method: "GET",
    };

    console.log(path);

    const result = await apiFetch({
        path,
        options,
    });

    return result;
}
