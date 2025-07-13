<script setup>
import useUserStore from "@/stores/useUserStore.js";


const {user} = useUserStore();

</script>


<template>    
	<div class="bookings">
		<div class="booking"
			v-for="(booking, index) in user.bookings"
		>
		</div>
	</div>
</template>   


<style scoped>
</style>
