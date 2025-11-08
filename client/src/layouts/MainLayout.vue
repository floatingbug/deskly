<script setup>
import {onMounted} from "vue";
import TheTopBar from "@/components/topBar/TheTopBar.vue";
import TheMenu from "@/components/menu/TheMenu.vue";
import useStateStore from "@/stores/useStateStore.js";
import useUserStore from "@/stores/useUserStore.js";


const { state } = useStateStore();
const {user} = useUserStore();

</script>

<template>
	<div class="main-layout">
		<div class="top-bar"
			v-if="user.isSignedIn"
		>
			<TheTopBar />
		</div>

		<div class="menu-left" :class="!state.isSideMenuOpen ? 'menu-left-closed' : ''">
			<TheMenu />
		</div>

		<div class="main-container"
			:class="state.isSideMenuOpen ? 'left-menu-open' : ''"
		>
			<div class="main-content">
				<slot name="mainContent" />
			</div>
		</div>

		<div class="footer">
			<slot name="footer" />
		</div>
	</div>
</template>

<style scoped>
.main-layout {
	width: 100%;
	display: flex;
	align-items: flex-start;
}

.top-bar {
	width: 100%;
	height: calc(var(--spacing-lg) * 2);
	position: fixed;
	top: 0;
	left: 0;
	z-index: 1000;
}

.menu-left {
	width: 100%;
	height: 100%;
	position: fixed;
	top: calc(var(--spacing-lg) * 2);
	left: 0;
	display: flex;
	flex-direction: column;
	transition: margin 250ms;
	z-index: 1000;
}

.menu-left-closed {
	margin-left: -100%;
}


.main-container {
	flex: 1;
	min-height: 100vh;
	display: flex;
	justify-content: center;
	padding: var(--spacing-sm);
	margin-top: calc(var(--spacing-xl) * 2.5);
	margin-bottom: 12rem;
	overflow-y: auto;
	transition: margin 250ms;
}

.main-content {
	width: 100%;
	max-width: 1200px;
	display: flex;
	flex-direction: column;
}

@media(min-width: 760px){
	.menu-left {
		max-width: 80%;
		height: calc(100dvh - var(--spacing-xl) * 3);
		padding: var(--spacing-xl);
	}

	.menu-left-closed {
		margin-left: -80%;
	}
}

@media(min-width: 1024px){
	.menu-left {
		max-width: 250px;
		position: sticky;
		margin-top: calc(var(--spacing-xl) * 2.5);
		margin-left: var(--spacing-md);
		padding: var(--spacing-sm);
		transition:
			margin-left 250ms ease,
			transform 250ms ease,
			opacity 250ms ease;
	}

	.menu-left-closed {
		margin-left: -250px;
		transform: translateX(-50px);
		opacity: 0;}
}

@media(min-width: 1800px){
	.left-menu-open {
		margin-right: 250px;
	}
}
</style>
