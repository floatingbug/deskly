<script setup>
const props = defineProps({
	kpis: Array,
});

</script>


<template>    
	<div class="kpis-container">
		<h3>Statistic Overview</h3>
		
		<div class="kpis-wrapper">
			<div class="kpi-card"
				v-for="(kpi, index) in kpis"
				:key="index"
			>
				<div class="name">
					<i class="name__icon" :class="kpi.icon"></i>
		
					<div class="name__label">
						{{kpi.label}}
					</div>
				</div>
		
				<div class="value">
					{{kpi.value}}
				</div>
		
				<div class="descriptions"
					v-if="kpi.description"
				>
					{{kpi.description}}
				</div>
			</div>
		</div>
	</div>
</template>   


<style scoped>
.kpis-container {
	width: 100%;
	padding: var(--spacing-md) 0;
}

.kpis-wrapper {
	width: 100%;
	display: grid;
	column-gap: var(--spacing-xl);
	row-gap: var(--spacing-md);
}

.kpi-card {
	display: flex;
	flex-direction: column;
	gap: var(--spacing-md);
	padding: var(--spacing-md);
	border-radius: var(--radius-md);
	border: 1px solid var(--bg-surface);
	background-color: var(--bg-primary-light);
}

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

@media(min-width: 768px){
	.kpis-wrapper{
		grid-template-columns: repeat(2, 1fr);
	}
}

@media(min-width: 1024px){
	.kpis-wrapper{
		grid-template-columns: repeat(4, 1fr);
	}
}
</style>
