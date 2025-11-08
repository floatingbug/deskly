<script setup>
import { ref, onMounted } from "vue";

const props = defineProps({
	imageUrls: Array,
});

const SERVER_URL = import.meta.env.VITE_SERVER_URL;
const items = ref([]);

onMounted(() => {
	items.value = props.imageUrls.map((url) => {
		return {
			imageUrl: `${SERVER_URL}${url}`,
		};
	});
});
</script>

<template>
	<Carousel :value="items" :numVisible="1" :numScroll="1">
		<template #item="slotProps">
			<Image preview>
				<template #image>
					<div class="image-container">
						<img :src="slotProps.data.imageUrl" alt="" />
					</div>
				</template>

				<template #preview>
					<img :src="slotProps.data.imageUrl" alt="preview" @click="slotProps.onClick" />
				</template>
			</Image>
		</template>
	</Carousel>
</template>

<style scoped>
.image-container {
	width: 100%;
}

.image-container img {
	width: 100%;
	height: 100%;
}
</style>
