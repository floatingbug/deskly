import { reactive } from "vue";

const state = reactive({
	isSideMenuOpen: false,
	isLoading: false,
});

export default function useStateStore() {
	return {
		state,
	};
}
