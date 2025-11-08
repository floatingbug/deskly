<script setup>
import {ref, onMounted, watch, toRaw} from "vue";
import draggable from "vuedraggable";


const props = defineProps({
	imagesMeta: Array,
	spaceId: String,
});


const emit = defineEmits(["changeImagesOrder:action"]);


const SERVER_URL = import.meta.env.VITE_SERVER_URL;
const imageItems = ref([]);

onMounted(() => {
	setImageItems();
})


watch(() => props.imagesMeta, () => {
	setImageItems();
}, {deep: true});


function setImageItems(){
	const cacheBuster = Date.now();

	imageItems.value = props.imagesMeta
		.sort((a, b) => {
			if(a.isCover) return -1;
			else if(b.isCover) return 1;
			return a - b;
		})
		.map(item => {
			return {
				id: item.order,
				imageName: item.imageName,
				url: `${SERVER_URL}${item.imagePath}?v=${cacheBuster}`,
				imagePath: item.imagePath,
				isCover: item.isCover,
				order: item.order,
			};
		});
}

function updateOrder() {
	imageItems.value.forEach((item, index) => {
		item.order = index + 1;
		if(item.order === 1) item.isCover = true;
		else item.isCover = false;
	});

	const rawImagesMeta = imageItems.value.map(item => {
		const {id, url, ...rest} = toRaw(item);
		return rest;
	});

	emit("changeImagesOrder:action", {
		action: "newImageOrder",
		newImagesMeta: rawImagesMeta,
		spaceId: props.spaceId,
	});
}

</script>


<template>
	<div class="edit-pictures">
		<draggable class="draggable"
			v-model="imageItems"
			item-key="id"
			@end="updateOrder"
			animation="200"
		>
			<template #item="{element}">
				<div class="image-item">
					<div class="cover"
						v-if="element.isCover"
					>
						<div class="img-container">
							<img :src="element.url" alt="">
							<Tag class="cover-tag">Cover</Tag>
						</div>
					</div>
					
					<div class="screenshot"
						v-if="!element.isCover"
					>
						<div class="img-container">
							<img :src="element.url" alt="">
						</div>
					</div>
				</div>
			</template>
		</draggable>
	</div>
</template>


<style scoped>
.draggable {
	width: 100%;
	display: grid;
	grid-template-columns: 1fr 1fr;
	column-gap: var(--spacing-sm);
}

.img-container {
	width: 100%;
}

.img-container img {
	width: 100%;
	height: 100%;
	aspect-ratio: 16 / 9;
	object-fit: cover;
}

.cover {
	position: relative;
}

.cover-tag {
	position: absolute;
	top: var(--spacing-sm);
	left: var(--spacing-sm);
}

@media(min-width: 768px) {
	.draggable {
		grid-template-columns: 1fr 1fr 1fr;
	}
}
</style>
