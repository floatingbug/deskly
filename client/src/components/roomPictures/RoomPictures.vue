<script setup>
import { ref, onMounted } from "vue";

const props = defineProps({
	pictures: Array,
});

const items = ref();

onMounted(() => {
	items.value = props.pictures.map((imageUrl) => {
		return {
			imageUrl: `${import.meta.env.VITE_SERVER_URL}/${imageUrl}`,
		};
	});
});
</script>

<template>
	<Carousel :value="items">
		<template #item="slotProps" :numVisible="1">
			<div class="img-wrapper">
				<img :src="slotProps.data.imageUrl" alt="" />
			</div>
		</template>
	</Carousel>
</template>

<style scoped>
.img-wrapper {
	width: 100%;
	aspect-ratio: 16 / 9;
	display: flex;
	align-items: center;
	overflow: hidden;
}

img {
	width: 100%;
}
</style>
