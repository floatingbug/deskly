import {ref} from "vue";


const space = ref();


function setSpace(data){
	space.value = data;
}

function getSpace(){
	return space;
}


export default function useSpaceStore(){
	return {
		setSpace,
		getSpace,
	};
}
