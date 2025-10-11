<script setup>
import { ref } from "vue";
import TieredMenu from "primevue/tieredmenu";

const emit = defineEmits(["userMenu:action"]);

const menu = ref();
const items = ref([
	{
		label: "Sign out",
		icon: "pi pi-sign-out",
		command: emitSignOut,
	},
]);

function emitSignOut() {
	emit("userMenu:action", {
		action: "signOut",
	});
}

function toggle(event) {
	menu.value.toggle(event);
}
</script>

<template>
	<Button severity="contrast" variant="text" @click="toggle">
		<i class="pi pi-user" />
	</Button>
	<TieredMenu ref="menu" id="overlay_tmenu" :model="items" popup />
</template>

<style scoped></style>
