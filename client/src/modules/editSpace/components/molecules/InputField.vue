<script setup>
import {ref, watch, toRaw} from "vue";


const localValue = ref(null);


const props = defineProps({
	item: Object,
	resetTrigger: Number,
});


const emit = defineEmits(["inputField:action"]);


watch(localValue, () => {
	emit("inputField:action", {
		action: "newValue",
		newValue: toRaw(localValue.value),
		itemId: props.item.id,
	});
});

// reset localValue
watch(() => props.resetTrigger, () => {
	localValue.value = null;
});

</script>


<template>
	<IftaLabel v-if="item.type === 'inputText'">
		<InputText class="input-text"
			:placeholder="item.value"
			v-model="localValue"
		/>
		<label :for="item.id">{{item.label}}</label>
	</IftaLabel>

	<IftaLabel v-if="item.type === 'textArea'">
		<Textarea class="description"
			:placeholder="item.value"
			v-model="localValue"
		/>
		<label :for="item.id">{{item.label}}</label>
	</IftaLabel>

	<IftaLabel v-if="item.type === 'inputNumber'">
		<InputNumber class="input-number"
			:placeholder="item.value"
			:minFractionDigits="2"
			v-model="localValue"
		/>
		<label :for="item.id">{{item.label}}</label>
	</IftaLabel>
</template>


<style scoped>
.description, .p-inputtext, .p-inputnumber {
	width: 100%;
}

.description {
	min-height: 240px;
	resize: none;
}
</style>
