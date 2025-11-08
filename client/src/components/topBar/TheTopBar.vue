<script setup>
import { useRouter } from "vue-router";
import useStateStore from "@/stores/useStateStore.js";
import UserMenu from "./components/UserMenu.vue";
import useUserStore from "@/stores/useUserStore.js";

const { state } = useStateStore();
const { unsetUser } = useUserStore();
const router = useRouter();

function onUserMenuAction(event) {
	if (event.action === "signOut") {
		unsetUser();
		router.push("/");
	}
}
</script>

<template>
	<div class="top-bar">
		<div class="container container-left">
			<Button
				class="menu-button"
				variant="outlined"
				severity="contrast"
				@click="state.isSideMenuOpen = !state.isSideMenuOpen"
			>
				<i class="pi pi-bars" />
			</Button>

			<span class="logo">DESKLY</span>
		</div>

		<div class="container container-right">
			<UserMenu @userMenu:action="onUserMenuAction" />
		</div>
	</div>
</template>

<style scoped>
.top-bar {
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 var(--spacing-md);
	background-color: var(--bg-primary);
}

.container {
	display: flex;
	align-items: center;
}

.container-left {
	display: flex;
	gap: var(--spacing-sm);
}

.logo {
	letter-spacing: 2px;
	color: var(--color-text-contrast);
}
</style>
