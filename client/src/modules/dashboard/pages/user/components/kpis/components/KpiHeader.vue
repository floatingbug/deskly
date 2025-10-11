<script setup>
import KpiCard from "./KpiCard.vue";

const props = defineProps({
	kpis: Array,
});
</script>

<template>
	<KpiCard v-for="(kpi, index) in kpis" :key="index">
		<template #header>
			<div class="name">
				<i class="name__icon" :class="kpi.icon"></i>

				<div class="name__label">
					{{ kpi.label }}
				</div>
			</div>
		</template>

		<div class="value">
			{{ kpi.value }}
		</div>

		<div class="descriptions" v-if="kpi.description">
			{{ kpi.description }}
		</div>
	</KpiCard>
</template>

<style scoped>
.name {
	display: flex;
	gap: var(--spacing-sm);
}

.name__icon {
	font-size: var(--font-size-lg);
}

.value {
	font-size: var(--font-size-xl);
	font-weight: bold;
	color: var(--bg-primary);
}
</style>
