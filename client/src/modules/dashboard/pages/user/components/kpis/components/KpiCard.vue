<script setup></script>

<template>
	<div class="card">
		<header>
			<slot name="header" />
		</header>

		<div class="main-content">
			<slot />
		</div>
	</div>
</template>

<style scoped>
.card {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	overflow: hidden;
	border-radius: var(--radius-md);
	box-shadow: var(--card-box-shadow);
	background-color: var(--card-bg);
}

header {
	padding: var(--spacing-md);
	color: var(--color-text);
	background-color: var(--card-header-bg);
}

.main-content {
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: var(--spacing-md);
}
</style>
