<script setup>
import {ref, onMounted} from "vue";
import useSpacesStore from "@/stores/useSpacesStore.js";
import apiFetch from "@/api/apiFetch.js";
import { useToast } from 'primevue/usetoast';


const {getSelectedSpace} = useSpacesStore();
const toast = useToast();
const space = ref();
const inputFile = ref(null);
const selectedFiles = ref([]);
const isInitialized = ref(false);


onMounted(async () => {
	space.value = getSelectedSpace();

	isInitialized.value = true;
});


function onFilesChanged(){
	const files = Array.from(inputFile.value.files);
	selectedFiles.value = files.map(file => {
		return {
			file,
			url: URL.createObjectURL(file),
		};
	});
}

function removeImage(index){
	URL.revokeObjectURL(selectedFiles.value[index].url);
	selectedFiles.value.splice(index, 1);
}

async function saveScreenshots(){
	const formData = new FormData();
	selectedFiles.value.forEach(image => {
		formData.append("images", image.file);
	});
		
	formData.append("spaceId", space.value._id);

	const path = "/spaces/add-screenshots";
	const options = {
		method: "POST",
		headers: {},
		body: formData,
	};

	const result = await apiFetch({
		path,
		options,
		addJwt: true,
	});
	console.log(result);

	if(!result.success){
		toast.add({ severity: 'info', summary: 'To many pictures', detail: result.errors[0], life: 5000 });
		return;
	}

	space.value.imagesMeta = result.data.imagesMeta;

	// remove selected files
	selectedFiles.value.forEach(file => {
		URL.revokeObjectURL(file.url);
	});

	selectedFiles.value = [];
	inputFile.value.value = null;
}

</script>


<template>
	<div class="preview-images">
		<div class="image-container"
			v-for="(image, index) in selectedFiles"
		>
			<img :src="image.url" alt="">

			<Button class="remove-image-button"
				severity="danger"
				@click="removeImage(index)"
			>
				<i class="pi pi-times" />
			</Button>
		</div>
	</div>

	<div class="buttons">
		<Button
			severity="secondary"
			raised
			@click="inputFile.click()"
		>
			Add screenshots
		</Button>
		
		<Button
			v-if="selectedFiles.length > 0"
			@click="saveScreenshots"
		>
			Save screenshots
		</Button>
	</div>

	<input 
		ref="inputFile" 
		type="file" 
		accept="image/*"
		multiple
		style="display: none"
		@change="onFilesChanged"
	>
</template>


<style scoped>
.preview-images {
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	gap: var(--spacing-sm);
}

.image-container {
	max-width: 150px;
	position: relative;
}

.image-container img {
	width: 100%;
	height: 100%;
	aspect-ratio: 16 / 9;
	object-fit: cover;
}

.buttons {
	display: flex;
	justify-content: flex-end;
	gap: var(--spacing-md);
	margin-top: var(--spacing-xl);
}

.remove-image-button {
	position: absolute;
	right: var(--spacing-xs);
	top: var(--spacing-xs);
	z-index: 2;
	padding: var(--spacing-xs);
}
</style>
