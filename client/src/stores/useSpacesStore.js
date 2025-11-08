import {ref} from "vue";
import apiFetch from "@/api/apiFetch.js";


const spaces = ref();
const selectedSpace = ref();


async function initializeSpacesStore(){
	const path = "/user/get-host-spaces";
	const options = {
		method: "GET",
		headers: {},
	};

	const result = await apiFetch({
		path,
		options,
		addJwt: true,
	});

	if(!result.success){
		return {
			success: false,
			errors: result.errors,
		};
	}

	spaces.value = result.data;

	return {success: true};
}

function getSpaces(){
	return spaces.value;
}

function selectSpace(spaceId){
	selectedSpace.value = spaces.value.find(space => space._id === spaceId);
}

function getSelectedSpace(){
	return selectedSpace.value;
}


export default function(){
	return {
		initializeSpacesStore,
		getSpaces,
		selectSpace,
		getSelectedSpace,
	};
}
