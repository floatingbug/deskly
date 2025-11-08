<script setup>
import {ref, onMounted} from "vue";
import { useRouter } from "vue-router";


const props = defineProps({
	space: Object,
});


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

		<div class="amenities">
			<div class="amenities__title">
				Amenities
			</div>

			<div class="amenities__container">
				<div class="amenities__item"
					v-for="(amenity, index) in space.amenities"
					:key="index"
				>
					{{amenity.label}}
				</div>
			</div>
		</div>

		<div class="details">
			<div class="details-item">
				<div class="details-label">Capacity:</div>
				<div class="details-value">
					{{ space.capacity }}
				</div>
			</div>

			<div class="details-item">
				<div class="details-label">$/hr:</div>

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
	height: 350px;
	border-radius: var(--radius-md);
	user-select: none;
	cursor: pointer;
	overflow: hidden;
	border: 1px solid var(--border-color-neutral);
	background-color: var(--bg-surface-light);
}

.space-card:hover {
	box-shadow: 0 0 2px 1px var(--bg-primary);
}

header {
	height: 60%;
	position: relative;
}

header .name {
	width: 100%;
	position: absolute;
	top: 0;
	left: 0;
	padding: var(--spacing-md);
	font-size: var(--font-size-xl);
	font-weight: bold;
	color: var(--color-surface-glass);
	background-color: var(--bg-surface-glass);
}

header .screenshots {
	width: 100%;
	height: 80%;
}

header .screenshots img {
	width: 100%;
	height: 100%;
	aspect-ratio: 16 / 9;
	object-fit: cover;
}

header .description {
	width: 100%;
	padding: var(--spacing-md);
	overflow: hidden;
}

.amenities {
	height: 20%;
	padding: var(--spacing-md);
	overflow: hidden;
}

.amenities__title {
	color: var(--color-subtitle);
	font-weight: bold;
	margin-top: var(--spacing-sm);
}

.amenities__container {
	display: flex;
	flex-wrap: wrap;
	gap: var(--spacing-md);
	margin-top: var(--spacing-sm);
}

.details {
	width: 100%;
	height: 10%;
	display: flex;
	gap: var(--spacing-md);
	padding: var(--spacing-md);
	margin-top: var(--spacing-sm);
}

.details-item {
	display: flex;
	gap: var(--spacing-xs);
}

.details-label {
}

.details-value {
	color: var(--color-primary);
	font-weight: bold;
}

footer {
	padding: var(--spacing-md);
}
</style>
