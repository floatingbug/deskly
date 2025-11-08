<script setup>
import { ref } from "vue";
import MenuLayout from "../layouts/MenuLayout.vue";


const items = ref([
	{
		label: "Home",
		id: "home",
		isActive: false,
		path: "/",
		icon: "pi pi-home",
	},
]);

</script>

<template>
	<MenuLayout :items />
</template>

<style scoped>
</style>
