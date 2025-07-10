import {ref} from "vue";


const spacesStoreSpaces = ref([]);
const spacesStoreMetaData = ref([]);


function useSpacesStore(){
	return {spacesStoreSpaces, spacesStoreMetaData};
}


export default useSpacesStore;
