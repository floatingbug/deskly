import apiFetch from "@/api/apiFetch.js";

export default async function ({userInput, images}) {
	const formData = new FormData();
	
	formData.append("userInput", JSON.stringify(userInput));

	images.forEach(file => {
		formData.append("images", file);
	});

    const path = "/spaces/add-space";
    const options = {
        method: "POST",
        headers: {},
        body: formData,
    };

    const result = await apiFetch({
        path,
        options,
        addJwt: true,
    });

    return result;
}
