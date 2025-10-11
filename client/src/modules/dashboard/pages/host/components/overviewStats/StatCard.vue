<script setup>
import Chart from "primevue/chart";

const props = defineProps({
	stat: Object,
});
</script>

<template>
	<div class="stat-card">
		<header>
			<small>
				{{ stat.header }}
			</small>
		</header>

		<section class="main-content">
			<div class="count__item" v-if="stat.type === 'count'">
				<div class="count__value">{{ stat.value }}</div>
			</div>
		</section>

		<footer></footer>
	</div>
</template>

<style scoped>
.stat-card {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	border-radius: 8px;
	overflow: hidden;
	border: 1px solid var(--border-color-neutral);
	background-color: var(--color-bg);
}

header {
	padding: var(--spacing-md);
	background-color: var(--bg-primary-light-dark);
}

.main-content {
	padding: var(--spacing-md);
}

.count__item {
	display: flex;
}

.count__label {
	min-width: 88px;
}
</style>
