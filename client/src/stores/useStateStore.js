import {reactive} from "vue";


const state = reactive({
	isSideMenuOpen: false,
});


export default function useStateStore(){
	return {
		state,
	};
}
