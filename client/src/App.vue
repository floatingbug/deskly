<script setup>
import {onMounted} from "vue";
import { RouterLink, RouterView } from 'vue-router'
import TheNavbar from "@/components/TheNavbar.vue";
import useUserStore from "@/stores/useUserStore.js";
import fetchUserByJwtAPI from "@/api/fetchUserByJwtAPI.js";


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

	<RouterView />
</template>

<style scoped>
</style>
