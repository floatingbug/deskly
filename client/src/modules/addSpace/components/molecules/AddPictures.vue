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
			url: URL.createObjectURL(file)
		});
	}

	event.target.value = "";

	emit("addPictures:action", {
		action: "newImages",
		images: selectedFiles.value.map(item => item.file),
	});
}

function removeFile(index) {
	URL.revokeObjectURL(selectedFiles.value[index].url);
	selectedFiles.value.splice(index, 1);

	emit("addPictures:action", {
		action: "newImages",
		images: selectedFiles.value.map(item => item.file),
	})
}

async function uploadFiles() {
	if (!selectedFiles.value.length) {
		alert("Bitte mindestens ein Bild auswählen!");
		return;
	}

	const formData = new FormData();
	selectedFiles.value.forEach(item => formData.append("files[]", item.file));

	try {
		const res = await fetch("/upload", {
			method: "POST",
			body: formData
		});
		const data = await res.text();
		alert("Upload erfolgreich: " + data);

		selectedFiles.value.forEach(item => URL.revokeObjectURL(item.url));
		selectedFiles.value = [];

		// Event leeren
		emit("update:files", []);
	} catch (err) {
		alert("Fehler beim Upload: " + err);
	}
}
</script>

<template>
	<div>
		<h1>Bilder hochladen</h1>

		<input
			ref="fileInput"
			type="file"
			accept="image/*"
			multiple
			style="display:none"
			@change="onFileChange"
		/>

		<button type="button" @click="openFileDialog">Dateien auswählen</button>

		<div v-if="selectedFiles.length > 0" class="file-count">
			{{ selectedFiles.length }} Bild(er) ausgewählt
		</div>

		<div class="preview-container">
			<div v-for="(item, index) in selectedFiles" :key="index" class="preview-item">
				<img :src="item.url" class="preview-img" />
				<button type="button" @click="removeFile(index)">❌</button>
			</div>
		</div>
	</div>
</template>

<style scoped>
.file-count {
	margin-top: 0.5rem;
	font-size: 14px;
	color: #555;
}

.preview-container {
	display: flex;
	flex-wrap: wrap;
	gap: 10px;
	margin-top: 1rem;
}

.preview-item {
	position: relative;
}

.preview-img {
	width: 120px;
	height: auto;
	border: 1px solid #ddd;
	border-radius: 6px;
}

.preview-item button {
	position: absolute;
	top: 2px;
	right: 2px;
	background: rgba(255,255,255,0.7);
	border: none;
	cursor: pointer;
}
</style>
