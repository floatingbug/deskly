<script setup>
import { defineEmits, defineProps } from "vue";
import AuthInput from "../molecules/AuthInput.vue";

const props = defineProps({
	modelValue: {
		type: Object,
		required: true,
	},
	items: {
		type: Array,
		required: true,
	},
	errors: {
		type: Object,
		required: true,
	},
});

const emit = defineEmits(["update:modelValue", "authForm:action"]);

function onInputActions(id, event) {
	const updated = { ...props.modelValue, [id]: event.newValue};
	emit("update:modelValue", updated);

	// tell parent to remove errors
	emit("authForm:action", {action: "removeErrors", inputId: id});
}
</script>

<template>
	<form
		class="auth-form"
		@submit.prevent="emit('authForm:action', {action: 'submit'})"
	>
		<AuthInput
			v-for="(item, index) in items"
			:key="index"
			:item="item"
			:modelValue="props.modelValue[item.id]"
			:errors="errors[item.id]"
			@authInput:action="onInputActions(item.id, $event)"
		/>

		<div class="submit">
			<Button type="submit">Sign in</Button>
		</div>
	</form>
</template>

<style scoped>
.auth-form {
	display: flex;
	flex-direction: column;
	gap: var(--spacing-sm);
	width: 100%;
	max-width: 400px;
	margin: 0 auto;
}

.submit {
	display: flex;
	justify-content: flex-end;
	margin-top: 1rem;
}
</style>
