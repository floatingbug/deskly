<script setup>
const props = defineProps({
	item: {
		type: Object,
		required: true,
	},
	modelValue: {
		type: [String, Number],
		default: "",
	},
	errors: {
		type: Array,
		required: true,
	},
});


const emit = defineEmits(["authInput:action"]);


function handleNewValue(newValue){
	emit("authInput:action", {
		action: "newValue",
		newValue,
	});
}

</script>

<template>
	<InputGroup
		v-if="item.type === 'text' ||
		item.type === 'email' ||
		item.type === 'password'"
	>
		<InputGroupAddon>
			<i class="pi pi-user" v-if="item.type === 'text'"></i>
			<i class="pi pi-envelope" v-if="item.type === 'email'"></i>
			<i class="pi pi-lock" v-if="item.type === 'password'"></i>
		</InputGroupAddon>

		<FloatLabel variant="in">
			<InputText
				:type="item.type"
				:modelValue="modelValue"
				@update:modelValue="handleNewValue"
			/>
			<label :for="item.id">{{ item.label }}</label>
		</FloatLabel>
	</InputGroup>

	<FloatLabel 
		v-if="item.type === 'select'"
		variant="in"
	>
		<Select 
			@update:modelValue="handleNewValue($event.id)"
			:options="item.options"
			optionLabel="name"
		/>
		<label for="item.id">{{item.label}}</label>
	</FloatLabel>

	<div class="errors"
		v-if="errors.length > 0"
	>
		<div class="error"
			v-for="(error, index) in errors"
			:key="index"
		>
			{{error}}
		</div>
	</div>
	
</template>

<style scoped>
.p-select {
	width: 100%;
}
</style>
