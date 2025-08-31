import { ref } from "vue";
import apiFetch from "@/api/apiFetch.js";


const spaces = ref([]);
const totalSpaces = ref(0);


async function fetchSpaces({ query, isPaginating = false }) {
    const path = `/spaces${query}`;
    const options = {
        method: "GET",
    };

    const result = await apiFetch({
        path,
        options,
    });

    if(!result.success){
        return {success: false, errors: result.errors};
    }

    if(!isPaginating) spaces.value = result.data.spaces;
    else spaces.value.push(...result.data.spaces);

    totalSpaces.value = result.data.metaData.totalEntries;

    return {success: true};
}

function clearSpaces(){
    spaces.value = [];
}


export default function useSpacesStore() {
    return {spaces, fetchSpaces, totalSpaces, clearSpaces};
}
