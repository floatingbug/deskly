<script setup>
import { ref } from "vue";
import MenuLayout from "../layouts/MenuLayout.vue";


const items = ref([
	{
		label: "Dashboard",
		id: "dashboard",
		isActive: false,
		path: "/dashboard/user",
		icon: "pi pi-th-large",
	},
	{
		label: "Find Spaces",
		id: "addSpace",
		isActive: false,
		path: "/spaces",
		icon: "pi pi-search",
	},
	{
		label: "Inbox",
		id: "inbox",
		isActive: false,
		path: "/inbox",
		icon: "pi pi-inbox",
	},
]);
</script>

<template>
	<MenuLayout :items="items" />
</template>

<style scoped>
</style>
