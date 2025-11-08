import { reactive, onMounted, onBeforeUnmount } from "vue";

const state = reactive({
	isSideMenuOpen: false,
	isLoading: false,
});

function updateSideMenuState() {
	state.isSideMenuOpen = window.innerWidth >= 1024;
}

export default function useStateStore() {
	onMounted(() => {
		updateSideMenuState();

		window.addEventListener("resize", updateSideMenuState);
	});

	onBeforeUnmount(() => {
		window.removeEventListener("resize", updateSideMenuState);
	});

	return {
		state,
	};
}
