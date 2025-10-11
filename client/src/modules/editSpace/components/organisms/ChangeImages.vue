<script setup>
import {ref, onMounted} from "vue";
import Carousel from "primevue/carousel";


const props = defineProps({
	imagesMeta: Array,
});


const imagesMetaItems = ref([]);


onMounted(() => {
	// set imagesMetaItems
	imagesMetaItems.value = props.imagesMeta.map(item => {
		return {
			url: `${import.meta.env.VITE_SERVER_URL}${item.imagePath}`,
		};
	});

});

</script>


<template>
	<Carousel
		:value="imagesMetaItems" 
		:numVisible="1" 
		:numScroll="1"
	>
		<template #item="slotProps">
			<div class="image-container">
				<img :src="slotProps.data.url" alt="">
				<div class="buttons">
					<Button
						severity="secondary"
					>
						Change Screenshot
					</Button>
					<Button
						severity="danger"
					>
						<i class="pi pi-times" />
					</Button>
				</div>
			</div>
		</template>
	</Carousel>
</template>


<style scoped>
.p-carousel {
}

.image-container {
	width: 100%;
	position: relative;
}

img {
	width: 100%;
	height: 100%;
	aspect-ratio: 16 / 9;
}

.image-container .buttons {
	position: absolute;
	right: var(--spacing-sm);
	top: var(--spacing-sm);
	display: flex;
	gap: var(--spacing-sm);
}

.image-container .buttons .p-button {
	padding: calc(var(--spacing-sm) / 2);
}
</style>
