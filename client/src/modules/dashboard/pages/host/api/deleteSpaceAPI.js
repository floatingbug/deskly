import apiFetch from "@/api/apiFetch.js";

export default async function deleteSpaceAPI({ spaceId }) {
	const path = "/spaces/delete-space";
	const options = {
		method: "DELETE",
		headers: {
			"content-type": "application/json",
		},
		body: JSON.stringify({ spaceId: spaceId }),
	};

	const result = await apiFetch({
		path,
		options,
		addJwt: true,
	});

	return result;
}
