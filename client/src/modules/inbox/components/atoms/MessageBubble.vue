<script setup>
const props = defineProps({
	message: {
		type: Object,
		required: true,
	},
});

console.log(props.message);

</script>


<template>
	<div class="message-bubble">
		<div class="message-creator-name">
			{{message.messageCreatorName}} 
		</div>
		<div class="message">
			{{message.message}}
		</div>
	</div>
</template>


<style scoped>
.message-bubble {
	display: flex;
	flex-direction: column;
	gap: var(--spacing-md);
	padding: var(--spacing-md);
	border-radius: var(--radius-md);
	border: 1px solid var(--border-color-neutral);
	background-color: var(--bg-primary-light);
}

.message {
	color: var(--color-subtitle);
}
</style>
