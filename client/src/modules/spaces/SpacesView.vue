<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import Filter from "./components/Filter.vue";
import Sort from "./components/Sort.vue";
import MainLayout from "@/layouts/MainLayout.vue";
import TheTopBar from "@/components/topBar/TheTopBar.vue";
import TheMenu from "@/components/menu/TheMenu.vue";
import SpacesLayout from "./layouts/SpacesLayout.vue";
import useSpacesStore from "./stores/useSpacesStore.js";
import useDevice from "@/composables/useDevice.js";

const { spaces, fetchSpaces, totalSpaces, clearSpaces } = useSpacesStore();
const { device } = useDevice();
const isInitialized = ref(false);
const isFilterOpen = ref(true);
let filterQuery = "";
let sortQuery = "";
let pageQuery = "?page=0&limit=10";
let query = "";
let paginationState = {
	page: 0,
	limit: 10,
};

onMounted(async () => {
	const response = await fetchSpaces({ query: pageQuery });
	if (!response.success) {
		console.log("Error: ", response.errors);
	}

	isInitialized.value = true;
});

onBeforeUnmount(() => {
	clearSpaces();
});

async function onFilterAction(event) {
	if (event.action === "closeFilter") {
		isFilterOpen.value = false;
	} else if (event.action === "filterReset") {
		query = pageQuery;
		filterQuery = "";
		if (sortQuery) query += "&" + sortQuery;

		const response = await fetchSpaces({ query });
	} else if (event.action === "newFilterQuery") {
		filterQuery = event.query;
		paginationState.page = 0;
		pageQuery = `?page=${paginationState.page}&limit=${paginationState.limit}`;
		query = pageQuery;
		if (filterQuery) query += "&" + filterQuery;
		if (sortQuery) query += "&" + sortQuery;

		const response = await fetchSpaces({ query });
	}
}

async function onSortAction(event) {
	sortQuery = event.query;
	paginationState.page = 0;
	pageQuery = `?page=${paginationState.page}&limit=${paginationState.limit}`;
	query = pageQuery;
	if (filterQuery) query += "&" + filterQuery;
	if (sortQuery) query += "&" + sortQuery;

	const response = await fetchSpaces({ query });
}

async function onSpacesAction(event) {
	if (spaces.value.length < totalSpaces.value) {
		paginationState.page++;
		pageQuery = `?page=${paginationState.page}&limit=${paginationState.limit}`;
		query = pageQuery;
		if (filterQuery) query += "&" + filterQuery;
		if (sortQuery) query += "&" + sortQuery;

		await fetchSpaces({ query, isPaginating: true });
	}
}
</script>

<template>
	<MainLayout v-if="isInitialized">
		<template #topBar>
			<TheTopBar />
		</template>

		<template #menuLeft>
			<TheMenu />
		</template>

		<template #mainContent>
			<div class="open-filter-button">
				<Button v-if="!isFilterOpen && device.size <= 1024" rounded @click="isFilterOpen = true">
					<span>Filter</span>
					<i class="pi pi-filter"></i>
				</Button>
			</div>

			<div class="main-content__spaces">
				<div class="main-content__left">
					<div class="main-content__filter" :class="!isFilterOpen && device.size <= 1024 ? 'filter-closed' : ''">
						<Filter @filter:action="onFilterAction" />
					</div>
				</div>

				<div class="main-content__right">
					<div class="main-content__sort">
						<Sort @sort:action="onSortAction" />
					</div>

					<div class="settings">
						<div class="settings__item">
							<div class="settings__item-label">Found Spaces:</div>
							<div class="settings__item-value">
								{{ totalSpaces }}
							</div>
						</div>
					</div>

					<SpacesLayout :spaces="spaces" @spaces:action="onSpacesAction" />
				</div>
			</div>
		</template>
	</MainLayout>
</template>

<style scoped>
.main-content__filter {
	width: 100%;
	max-width: 320px;
	height: 100%;
	position: absolute;
	top: calc(var(--spacing-lg) * 2);
	left: 0;
	z-index: 800;
	transition: transform 250ms;
}

.main-content__spaces {
	display: flex;
	justify-content: center;
}

.main-content__right {
	display: flex;
	flex-direction: column;
	gap: var(--spacing-xl);
}

.filter-closed {
	transform: translateX(-100%);
}

.open-filter-button {
	margin-bottom: var(--spacing-xl);
	z-index: 900;
}

.settings__item {
	display: flex;
	gap: var(--spacing-sm);
}

@media (min-width: 1024px) {
	.main-content__filter {
		position: static;
	}

	.main-content__spaces {
		gap: var(--spacing-xl);
	}
}
</style>
