<script setup>
import { ref, watch } from "vue";

// Emits definieren
const emit = defineEmits(["addPictures:action"]);

const fileInput = ref(null);
const selectedFiles = ref([]);
const maxFiles = 5;

function openFileDialog() {
	fileInput.value.click();
}

function onFileChange(event) {
	const files = Array.from(event.target.files);

	if (selectedFiles.value.length + files.length > maxFiles) {
		alert(`You can choose a maximum of ${maxFiles} images.`);
		event.target.value = "";
		return;
	}

	for (const file of files) {
		selectedFiles.value.push({
			file,
			order: selectedFiles.value.length + 1,
			isCover: selectedFiles.value.length === 0,
			url: URL.createObjectURL(file),
		});
	}

	event.target.value = "";

	emit("addPictures:action", {
		action: "newImages",
		images: selectedFiles.value,
	});
}

function removeFile(index) {
	URL.revokeObjectURL(selectedFiles.value[index].url);
	selectedFiles.value.splice(index, 1);

	emit("addPictures:action", {
		action: "newImages",
		images: selectedFiles.value.map((item) => item.file),
	});
}

</script>

<template>
	<div>
		<input ref="fileInput" type="file" accept="image/*" multiple style="display: none" @change="onFileChange" />

		<div class="add-img-button">
			<Button class="add-image-button"
				severity="secondary"
				@click="openFileDialog"
			>
				<i class="pi pi-times" />
				Add images
			</Button>
		</div>

		<div v-if="selectedFiles.length > 0" class="file-count">{{ selectedFiles.length }} images selected</div>

		<div class="preview-container">
			<div v-for="(item, index) in selectedFiles" :key="index" class="preview-item">
				<img :src="item.url" class="preview-img" />
				<Button
					severity="danger"
					@click="removeFile(index)"
				>
					<i class="pi pi-times" style=""/>
				</Button>
			</div>
		</div>
	</div>
</template>

<style scoped>
.file-count {
	margin-top: var(--spacing-md);
	font-size: var(--font-size-sm);
	color: var(--color-subtitle);
}

.preview-container {
	display: flex;
	flex-wrap: wrap;
	gap: var(--spacing-sm);
	margin-top: var(--spacing-md);
}

.preview-item {
	position: relative;
}

.preview-img {
	width: 100%;
	max-width: 180px;
	height: 100%;
	aspect-ratio: 16 / 9;
	object-fit: cover;
}

.preview-item button {
	position: absolute;
	top: 2px;
	right: 2px;
	cursor: pointer;
}

.add-image-button {
	border: 1px solid var(--border-color-neutral);
}
</style>
