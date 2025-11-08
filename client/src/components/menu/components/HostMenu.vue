<script setup>
import { ref } from "vue";
import MenuLayout from "../layouts/MenuLayout.vue";


const items = ref([
	{
		label: "Dashboard",
		id: "dashboard",
		isActive: false,
		path: "/dashboard/host",
		icon: "pi pi-th-large",
	},
	{
		label: "Add Space",
		id: "addSpace",
		isActive: false,
		path: "/add-space",
		icon: "pi pi-plus",
	},
	{
		label: "Inbox",
		id: "inbox",
		isActive: false,
		path: "/inbox",
		icon: "pi pi-envelope",
	},
]);
</script>

<template>
	<MenuLayout :items="items" />
</template>

<style scoped>
</style>
