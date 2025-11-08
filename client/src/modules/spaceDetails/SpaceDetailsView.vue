<script setup>
import { ref, onMounted } from "vue";
import ImageCarousel from "./components/organisms/ImageCarousel.vue";
import useBookingsStore from "@/stores/useBookingsStore.js";


const {booking} = useBookingsStore();
const space = booking.value.space;
const createdAt = ref();
const imageUrls = ref([]);
const isInitialized = ref(false);


onMounted(() => {
	createdAt.value = new Date(space.createdAt).toLocaleDateString();

	// set imageUrls
	imageUrls.value = space.imagesMeta.sort((a, b) => {
		if(a.isCover && !b.isCover) return -1;
		if(!a.isCover && b.isCover) return 1;
		return a.order - b.order;
	})
		.map(obj => obj.imagePath);

	isInitialized.value = true;
});

</script>

<template>
	<div class="space-informations"
		v-if="isInitialized"
	>
		<div class="space-informations__container">
			<header>
				<div class="header__name">
					<h2>
						{{ space.name }}
					</h2>
				</div>
			
				<div class="header__carousel">
					<ImageCarousel :imageUrls="imageUrls" />
				</div>
			
				<div class="header__items">
					<div class="header__item">
						<div class="header__description">
							{{ space.description }}
						</div>
					</div>
			
					<div class="header__item header__item-location">
						<div class="header__location">
							{{ space.address }}
						</div>
					</div>
				</div>
			</header>
			
			<div class="content">
				<div class="content__items">
					<ul>
						<li v-for="(amenity, index) in space.amenities">
							{{ amenity.label }}
						</li>
					</ul>
				</div>
			
				<div class="content__items">
					<div class="content__items-item">
						<span>Hourly Rate:</span>
						<div class="content__item-value">
							{{ space.hourlyRate }}
						</div>
					</div>
			
					<div class="content__items-item">
						<span>Capacity:</span>
						<div class="content__item-value">
							{{ space.capacity }}
						</div>
					</div>
				</div>
			</div>
			
			<footer>
				<div class="date">
					<span>Created at:</span>
					{{ createdAt }}
				</div>
			</footer>
		</div>
	</div>
</template>

<style scoped>
.space-informations {
	width: 100%;
	display: flex;
	justify-content: center;
}

.space-informations__container {
	width: 100%;
	max-width: 1024px;
	display: flex;
	flex-direction: column;
	padding: var(--spacing-md);
}

.header__carousel {
	margin: calc(var(--spacing-xl) * 2) 0;
}

.header__items {
	display: flex;
	flex-direction: column;
	gap: var(--spacing-md);
}

.header__item-location {
	color: var(--color-subtitle);
}

.content {
	max-width: 400px;
	display: flex;
	justify-content: space-between;
	margin: calc(var(--spacing-lg) * 2) 0;
}

.content__items {
	display: flex;
	flex-direction: column;
	gap: var(--spacing-md);
	margin: var(--spacing-md) 0;
}

.content ul {
	display: flex;
	flex-direction: column;
	gap: var(--spacing-md);
	padding: 0 0 0 var(--spacing-md);
	margin: 0;
}

.content__items-item > span {
	display: inline-block;
	min-width: 96px;
}

.content__item-value {
	display: inline-block;
	font-weight: bold;
	color: var(--color-primary);
}

footer {
	margin: var(--spacing-md) 0;
}

footer .date {
	color: var(--color-subtitle);
}
</style>
