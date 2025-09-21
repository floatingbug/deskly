<script setup>
import {ref, onMounted} from "vue";
import useTransferCache from "@/composables/useTransferCache.js";


const {getCache} = useTransferCache();
const detailItems = ref([]);
const amenityItems = ref([]);
const space = ref();
const isInitialized = ref(false);


onMounted(async() => {
	const booking = await getCache();
	space.value = booking.space;

	detailItems.value = [
		{
			id: "description",
			label: "Description",
			value: space.value.description,
		},
		{
			id: "location",
			label: "Locaction",
			value: space.value.location,
		},
		{
			id: "createdAt",
			label: "Created at",
			value: space.value.createdAd,
		},
		{
			id: "capacity",
			label: "Capacity",
			value: space.value.capacity,
		},
		{
			id: "hourlyRate",
			label: "Hourly Rate",
			value: space.value.hourlyRate,
		},
	];

	amenityItems.value = space.value.amenities;

	isInitialized.value = true;
})

</script>


<template>
	<div class="space-details"
		v-if="isInitialized"
	>
		<header>
			<h2>{{space.name}}</h2>
		</header>

		<div class="detail-items">
			<div class="detail-items__row"
				v-for="(item, index) in detailItems"
				:key="index"
			>
				<div class="detail-items__row-name">
					{{item.label}}:
				</div>
				
				<div class="detail-items__row-value">
					{{item.value}}
				</div>
			</div>
		</div>

		
		<div class="amenity-items">
			<h3>Amenities</h3>

			<div class="amenity-items__amenity"
				v-for="(amenity, index) in amenityItems"
				:key="index"
			>
				{{amenity.label}}
			</div>
		</div>
	</div>
</template>


<style scoped>
.space-details {
	width: 100%;
	display: flex;
	flex-direction: column;
}



.amenity-items {
	display: flex;
	flex-direction: column;
	padding: var(--spacing-xl) var(--spacing-md);
}
</style>
