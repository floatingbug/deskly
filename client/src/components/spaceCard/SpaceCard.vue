<script setup>
import {ref, onMounted} from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
	space: Object,
});

console.log(props.space);

const router = useRouter();
const SERVER_URL = import.meta.env.VITE_SERVER_URL;
const coverImageUrl = ref();


onMounted(() => {
	// set cover image path
	const imageMetaData = props.space.imagesMeta.find(image => image.isCover);

	coverImageUrl.value = `${SERVER_URL}/${imageMetaData.imagePath}`;
});


function openBooking() {
	router.push(`/book-space?spaceId=${props.space._id}`);
}
</script>

<template>
	<div class="space-card" @click="openBooking">
		<header>
			<div class="screenshots">
				<img :src="coverImageUrl" :alt="coverImageUrl" />
			</div>

			<div class="name">
				{{ space.name }}
			</div>

			<div class="description">
				{{ space.description }}
			</div>
		</header>

		<div class="details">
			<div class="details-item">
				<div class="details-label">Capacity:</div>
				<div class="details-value">
					{{ space.capacity }}
				</div>
			</div>

			<div class="details-item">
				<div class="details-label">Hourly Rate:</div>

				<div class="details-value">
					{{ space.hourlyRate }}
				</div>
			</div>
		</div>

		<footer></footer>
	</div>
</template>

<style scoped>
.space-card {
	width: 100%;
	max-width: 300px;
	border-radius: var(--radius-md);
	user-select: none;
	cursor: pointer;
	overflow: hidden;
	background-color: var(--bg-surface);
}

.space-card:hover {
	box-shadow: 0 0 2px 3px var(--bg-primary);
}

header {
	position: relative;
}

.name {
	width: 100%;
	position: absolute;
	top: 0;
	left: 0;
	padding: var(--spacing-md);
	font-size: var(--font-size-xl);
	background-color: hsl(from var(--bg-success-light) h s l / 80%);
}

.screenshots {
	width: 100%;
	height: 300px;
}

.screenshots img {
	width: 100%;
	height: 100%;
	object-fit: cover;
}

.description {
	height: 100px;
	padding: var(--spacing-md);
	overflow: hidden;
}

.details {
	width: 100%;
	display: flex;
	gap: var(--spacing-md);
	padding: 0 var(--spacing-md);
}

.details-item {
	display: flex;
	gap: var(--spacing-xs);
}

.details-label {
}

.details-value {
}

footer {
	padding: var(--spacing-md);
}
</style>
