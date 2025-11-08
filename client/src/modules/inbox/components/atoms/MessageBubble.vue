<script setup>
const props = defineProps({
	message: {
		type: Object,
		required: true,
	},
});

</script>


<template>
	<div class="message">
		{{message.messageCreatorName}}
		{{message.message}}
	</div>
</template>


<style scoped>
</style>
