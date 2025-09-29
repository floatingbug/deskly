<script setup>
import {ref} from "vue";


const props = defineProps({
	space: Object,
});


</script>


<template>
	<div class="item"
	>
		<div class="item__label">
			Space Name
		</div>

		<div class="item__value">
			<InputText 
				:placeholder="space.name" 
			/>
		</div>
	</div>
</template>


<style scoped>
</style>
