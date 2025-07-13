<script setup>
import {onMounted} from "vue";
import { RouterLink, RouterView } from 'vue-router'
import TheNavbar from "@/components/TheNavbar.vue";
import useUserStore from "@/stores/useUserStore.js";
import fetchUserByJwtAPI from "@/api/fetchUserByJwtAPI.js";
import Toast from 'primevue/toast';


const {setUser} = useUserStore();


onMounted(async () => {
	if(localStorage.getItem("isSignedIn")){
		const fetchedUser = await fetchUserByJwtAPI({
			jwt: localStorage.getItem("jwt"),
		});

		setUser(fetchedUser.data.user);
	}
});

</script>

<template>
	<TheNavbar />
	<Toast />

	<RouterView />
</template>

<style>
.p-toast {
	z-index: 5000 !important;
}
</style>
