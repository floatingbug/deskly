import apiFetch from "@/api/apiFetch.js";

export default async function ({ userInput, images }) {
	const formData = new FormData();

	console.log(images);
	console.log(userInput);

	// add input fields
	formData.append("userInput", JSON.stringify(userInput));

	// add images
	images.forEach((img, index) => {
		formData.append("images", img.file);
	});

	// add image meta data
	const metaData = images.map(img => ({order: img.order, isCover: img.isCover}));
	const metaDataStringifyed = JSON.stringify(metaData);
	formData.append("imagesMeta", metaDataStringifyed);

	const path = "/spaces/add-space";
	const options = {
		method: "POST",
		headers: {},
		body: formData,
	};

	console.log(metaDataStringifyed);


	const result = await apiFetch({
		path,
		options,
		addJwt: true,
	});


	return result;
}
