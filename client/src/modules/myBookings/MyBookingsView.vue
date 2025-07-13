<script setup>
import {ref, onMounted} from "vue";
import Bookings from "./components/Bookings.vue";
import fetchBookingsAPI from "./api/fetchBookingsAPI.js";
import convertUtcTimeStringToLocalTimeString from "./utils/convertUtcTimeStringToLocalTimeString.js";
import useUserStore from "@/stores/useUserStore.js";


const {setUserStoreBookings, user} = useUserStore();


onMounted(async () => {
	// get bookings
	const fetchedBookings = await fetchBookingsAPI();

	// get spaces informations
	const fetchedSpaces = await fetchSpacesAPI();

	// map spaces informations to bookings

	// store bookings in user store
	setUserStoreBookings(fetchedBookings.data);

	console.log(user);
});

</script>


<template>    
	<Bookings />
</template>   


<style scoped>
</style>
