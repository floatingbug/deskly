const response = require("@utils/response");
const validator = require("validator");
const spacesService = require("@services/spaces");


async function addSpace(req, res, next){

	// parse body
	try{
		const userInput = JSON.parse(req.body.userInput);
		const imagesMeta = JSON.parse(req.body.imagesMeta);
		const images = req.files;

		req.body = {userInput, imagesMeta, images};
	}
	catch(error){
		return response(res, {
			success: false,
			code: 400,
			errors: [error],
		});
	}

	// validate payload/body
	const errors = validatePayload({payload: req.body, user: req.user});

	if(errors.length > 0) return response(res, {
		success: false,
		code: 400,
		errors,
	});

	// add space
	try{
		const result = await spacesService.addSpace({
			user: req.user,
			space: req.body,
		});

		response(res, result);
	}
	catch(error){
		next(error);
	}
}


function validatePayload({payload, user}) {
	const errors = [];
	const allowedAmenities = [
		{ id: "event_area", label: "Event Area" },
		{ id: "phone_booths", label: "Phone Booths" },
		{ id: "terrace", label: "Terrace" },
		{ id: "coffee", label: "Coffee" },
		{ id: "wifi", label: "WiFi" },
		{ id: "yoga_room", label: "Yoga Room" },
		{ id: "standing_desks", label: "Standing Desks" },
		{ id: "free_water", label: "Free Water" },
		{ id: "meeting_rooms", label: "Meeting Rooms" },
		{ id: "printers", label: "Printers" },
		{ id: "lockers", label: "Lockers" }
	];
	const { address, amenities, name, capacity, hourlyRate, description } = payload.userInput;

	if(user.role !== "host"){
		errors.push("Only hosts can add spaces.");

		return errors;
	}

	// === check if all necessary properties are provided ===
	if (!name) errors.push("Name is required.");
	if (!description) errors.push("Description is required.");
	if (!address) errors.push("Address is required.");
	if (capacity === undefined) errors.push("Capacity is required.");
	if (!amenities) errors.push("Amenities are required.");
	if (hourlyRate === undefined) errors.push("Hourly Rate is required.");

	// === check type and value ===
	if (name) {
		if (typeof name !== "string") {
			errors.push("Name must be of type string.");
		} else if (!validator.isLength(name, { min: 3, max: 20 })) {
			errors.push("Name must have at least 3 and at most 20 characters.");
		}
	}

	if (description) {
		if (typeof description !== "string") {
			errors.push("Description must be of type string.");
		} else if (!validator.isLength(description, { min: 10, max: 500 })) {
			errors.push("Description must have at least 10 and at most 500 characters.");
		}
	}

	if (address) {
		if (typeof address !== "string") {
			errors.push("Address must be of type string.");
		} else if (!validator.isLength(address, { min: 5, max: 50 })) {
			errors.push("Address must have at least 5 and at most 50 characters.");
		}
	}

	if (capacity !== undefined) {
		if (typeof capacity !== "number") {
			errors.push("Capacity must be of type number.");
		} else if (capacity < 1 || capacity > 2000) {
			errors.push("Capacity must be at least 1 and at most 2000.");
		}
	}

	if (hourlyRate !== undefined) {
		if (typeof hourlyRate !== "number") {
			errors.push("Hourly Rate must be of type number.");
		} else if (hourlyRate < 1 || hourlyRate > 2000) {
			errors.push("Hourly Rate must be at least 1 and at most 2000.");
		}
	}

	if(amenities){
		if(!Array.isArray(amenities)){
			errors.push("Amenities must be of type array.");
		} else {
			for(const amenity of amenities){
				if(typeof amenity !== "object" || amenity === null){
					errors.push("Each amenity must be a non-null object.");
				continue;
				}
				const keys = Object.keys(amenity);
				if(!("id" in amenity) || !("label" in amenity)){
					errors.push("Each amenity must have 'id' and 'label' properties.");
				}
				if(keys.some(key => key !== "id" && key !== "label")){
					errors.push("Amenities must only contain 'id' and 'label' properties.");
				}
				if(typeof amenity.id !== "string"){
					errors.push("Amenity 'id' must be of type string.");
				}
				if(typeof amenity.label !== "string"){
					errors.push("Amenity 'label' must be of type string.");
				}
				if (!allowedAmenities.some(a => a.id === amenity.id) ||
					!allowedAmenities.some(a => a.label === amenity.label)) {
  					errors.push("Not allowed amenity id of label.");
				}
			}
		}
	}

	return errors;
}


module.exports = addSpace;
