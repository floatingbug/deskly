<script setup>
import {computed} from "vue";


const props = defineProps({
	financialStats: Object,
});


const topSpaces = computed(() => props.financialStats.topEarningSpaces);

</script>


<template>    
	<div class="top-spaces card">
		<h3>Top Earning Spaces</h3>
		<div class="item" v-for="space in topSpaces" :key="space.spaceId">
			<div class="label">
				{{ space.name }}:
			</div>

			<div class="value">
				{{ space.revenue.toFixed(2) }}$
			</div>
		</div>
	</div>
</template>   


<style scoped>
.top-spaces {
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: var(--spacing-md);
	padding: var(--spacing-md);
	border-radius: var(--radius-md);
	border: 1px solid var(--bg-surface);
	background-color: var(--color-bg);
}

.item {
	display: flex;
	justify-content: space-between;
}
</style>
