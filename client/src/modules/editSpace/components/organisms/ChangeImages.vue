<script setup>
import {ref, onMounted, watch} from "vue";
import Carousel from "primevue/carousel";


const props = defineProps({
	imagesMeta: Array,
});


const emit = defineEmits(["changeImages:action"]);


const imagesMetaItems = ref([]);
const fileInput = ref(null);
const imageName = ref("");
const isDeleteDialogVisible = ref(false);


onMounted(() => {
	setImagesMetaItems();
})


watch(() => props.imagesMeta, () => {
	setImagesMetaItems();
	console.log(imagesMetaItems.value);
}, {deep: true});


function setImagesMetaItems(){
	const cacheBuster = Date.now();

	imagesMetaItems.value = props.imagesMeta.map(item => {
		return {
			url: `${import.meta.env.VITE_SERVER_URL}${item.imagePath}?v=${cacheBuster}`,
			imageName: item.imageName,
			imagePath: item.imagePath,
			isCover: item.isCover,
			order: item.order,
		};
	});
}

function openFileDialog(event){
	imageName.value = event;
	fileInput.value.click();
}

function handleInputFile(event){
	const file = event.target.files[0];

	emit("changeImages:action", {
		action: "changeImage",
		imageName: imageName.value,
		newImage: file,
	});
}

function openDeleteImageDialog(event){
	imageName.value = event;
	isDeleteDialogVisible.value = true;
}

function deleteImage(){
	emit("changeImages:action", {
		action: "deleteImage",
		imageName: imageName.value,
	});
	
	isDeleteDialogVisible.value = false;
}

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
						@click="openFileDialog(slotProps.data.imageName)"
					>
						Change Screenshot
					</Button>


					<Button
						severity="danger"
						@click="openDeleteImageDialog(slotProps.data.imageName)"
					>
						<i class="pi pi-times" />
					</Button>
				</div>
			</div>
		</template>
	</Carousel>
					
	<input 
		type="file" 
		class="input-file"
		ref="fileInput"
		@change="handleInputFile"
	>

	<Dialog
		v-model:visible="isDeleteDialogVisible"
		header="Delete Screenshot"
		modal
	>
		<p>Delete this screenshot?</p>

		<div class="delete-dialog__buttons">
			<Button
				severity="danger"
				@click="deleteImage"
			>
				Delete
			</Button>
			
			<Button
				severity="secondary"
				raised
				@click="isDeleteDialogVisible = false;"
			>
				Cancel
			</Button>
		</div>
	</Dialog>
</template>


<style scoped>
.image-container {
	width: 100%;
	position: relative;
}

img {
	width: 100%;
	height: 100%;
	aspect-ratio: 16 / 9;
	object-fit: cover;
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

.input-file {
	display: none;
}

.delete-dialog__buttons {
	width: 100%;
	display: flex;
	justify-content: flex-end;
	gap: var(--spacing-sm);
}
</style>
