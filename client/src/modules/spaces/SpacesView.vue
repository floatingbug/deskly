<script setup>
import {ref, reactive, onMounted, onBeforeUnmount, watch, computed} from "vue";
import { useRoute, useRouter } from "vue-router";
import useSpacesStore from "@/stores/useSpacesStore.js";
import fetchSpacesAPI from "./api/fetchSpacesAPI.js";
import SpaceCards from "./components/SpaceCards.vue";
import Filter from "./components/Filter.vue";
import Sort from "./components/Sort.vue";
import SearchInput from "./components/SearchInput.vue";
import useDevice from "@/composables/useDevice.js";


const {spacesStoreSpaces, spacesStoreMetaData} = useSpacesStore();
const route = useRoute();
const router = useRouter();
const {device} = useDevice();
const state = reactive({
  page: 0,
  limit: 10,
  searchInput: "",
  sort: {
    hourlyRate: "",
    capacity: "",
    date: "",
  },
  filter: {
    hourlyRate: null,
    capacity: null,
    amenities: [],
  },
});
const isFilterClosed = ref(true);
const isLoading = ref(false);
const error = ref("");
const abortRef = ref(null);
const sentinel = ref(null);
const cache = new Map();
const showBackToTop = ref(false);


onMounted(async () => {
  // initialize from URL
  const q = route.query;
  state.page = Number(q.page ?? 0);
  state.limit = Number(q.limit ?? 10);
  state.searchInput = String(q.searchInput ?? "");
  state.sort.hourlyRate = String(q.hourlyRate ?? "");
  state.sort.capacity = String(q.capacity ?? "");
  state.sort.date = String(q.createdAt ?? "");
  state.filter.hourlyRate = q.f_hourlyRate ? Number(q.f_hourlyRate) : null;
  state.filter.capacity = q.f_capacity ? Number(q.f_capacity) : null;
  state.filter.amenities = q.f_amenities ? String(q.f_amenities).split(",") : [];

  if(device.size >= 1024) isFilterClosed.value = false;
  await loadSpaces();

  // Infinite scroll observer
  const io = new IntersectionObserver(async entries => {
    const [entry] = entries;
    if(entry.isIntersecting){
      await loadMore();
    }
  }, { root: null, rootMargin: '300px', threshold: 0 });

  if(sentinel.value) io.observe(sentinel.value);

  const onScroll = () => {
    showBackToTop.value = window.scrollY > 600;
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  // store cleanup
  cleanupFns.push(() => window.removeEventListener('scroll', onScroll));
});
const cleanupFns = [];
onBeforeUnmount(() => {
  cleanupFns.forEach(fn => { try { fn(); } catch {} });
});



watch(() => device.size, () => {
	if(device.size >= 1024) isFilterClosed.value = false;
});


// Pagination controls removed; infinite scroll handles page advance

async function onSortAction(event){
  state.page = 0;
  if(event.action === "hourlyRateAscending") state.sort.hourlyRate = "ascending";
  else if(event.action === "hourlyRateDescending") state.sort.hourlyRate = "descending";
  else if(event.action === "hourlyRateClearSort") state.sort.hourlyRate = "";

  if(event.action === "capacityAscending") state.sort.capacity = "ascending";
  else if(event.action === "capacityDescending") state.sort.capacity = "descending";
  else if(event.action === "capacityClearSort") state.sort.capacity = "";

  if(event.action === "dateAscending") state.sort.date = "ascending";
  else if(event.action === "dateDescending") state.sort.date = "descending";
  else if(event.action === "dateClearSort") state.sort.date = "";

  await syncUrlAndLoad();
}

async function onSearchInputAction(event){
  state.page = 0;
  state.searchInput = event?.data?.searchInput ?? "";
  await syncUrlAndLoad();
}

async function onFilterAction(event){
  if(device.size < 1024) isFilterClosed.value = true;
  state.page = 0;
  if(event.action === 'newFilterSettings'){
    state.filter.hourlyRate = event.data.filterSettings.hourlyRate ?? null;
    state.filter.capacity = event.data.filterSettings.capacity ?? null;
    state.filter.amenities = event.data.filterSettings.amenities ?? [];
  }
  if(event.action === 'filterReset'){
    state.filter.hourlyRate = null;
    state.filter.capacity = null;
    state.filter.amenities = [];
  }
  await syncUrlAndLoad();
}

const queryString = computed(() => {
  const params = new URLSearchParams();
  params.set('page', String(state.page));
  params.set('limit', String(state.limit));
  if(state.searchInput) params.set('searchInput', state.searchInput);
  if(state.sort.hourlyRate) params.set('hourlyRate', state.sort.hourlyRate);
  if(state.sort.capacity) params.set('capacity', state.sort.capacity);
  if(state.sort.date) params.set('createdAt', state.sort.date);
  if(state.filter.hourlyRate != null) params.set('f_hourlyRate', String(state.filter.hourlyRate));
  if(state.filter.capacity != null) params.set('f_capacity', String(state.filter.capacity));
  if(state.filter.amenities && state.filter.amenities.length > 0) params.set('f_amenities', state.filter.amenities.join(','));
  return params.toString();
});

async function syncUrlAndLoad(){
  router.replace({ query: Object.fromEntries(new URLSearchParams(queryString.value)) });
  // reset list when we change core params (page usually 0)
  await loadSpaces({ append: false });
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

async function loadSpaces({ append = false } = {}){
  try{
    if(abortRef.value) abortRef.value.abort();
    abortRef.value = new AbortController();
    isLoading.value = true;
    error.value = "";
    const key = queryString.value;
    let fetched;
    if(cache.has(key)){
      fetched = cache.get(key);
    } else {
      fetched = await fetchSpacesAPI({ query: key });
      cache.set(key, fetched);
    }

    if(append){
      const existing = spacesStoreSpaces.value || [];
      const incoming = fetched.data.spaces || [];
      const seen = new Set(existing.map(s => s._id));
      const merged = existing.concat(incoming.filter(s => !seen.has(s._id)));
      spacesStoreSpaces.value = merged;
      spacesStoreMetaData.value = fetched.data.metaData;
    } else {
      spacesStoreSpaces.value = fetched.data.spaces;
      spacesStoreMetaData.value = fetched.data.metaData;
    }
  } catch(e){
    error.value = 'Failed to load spaces';
  } finally{
    isLoading.value = false;
  }
}

const hasMore = computed(() => {
  const total = Number(spacesStoreMetaData.value?.totalEntries ?? 0);
  return (spacesStoreSpaces.value?.length ?? 0) < total;
});

async function loadMore(){
  if(isLoading.value) return;
  if(!hasMore.value) return;
  state.page += 1;
  router.replace({ query: Object.fromEntries(new URLSearchParams(queryString.value)) });
  await loadSpaces({ append: true });
}

const isAppending = computed(() => isLoading.value && (spacesStoreSpaces.value?.length ?? 0) > 0);

function backToTop(){
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

</script>


<template>
	<div class="layout">

		<div class="home">
			<div
				class="filter-container"
				:class="{
					'filter-closed': isFilterClosed,
				}"
			>
				<Filter @filter:action="onFilterAction" />
			</div>
		
			<div class="home__right">
				<div class="search-filter-bar">
					<Button
						v-if="device.size < 1024"
						@click="isFilterClosed = false;"
					>
						Filter <i class="pi pi-angle-right"></i>
					</Button>
				<SearchInput @searchInput:action="onSearchInputAction" />
				</div>

			<!-- Active filter chips -->
			<div class="chips" v-if="state.searchInput || state.sort.hourlyRate || state.sort.capacity || state.sort.date || state.filter.hourlyRate != null || state.filter.capacity != null || (state.filter.amenities && state.filter.amenities.length)">
				<Chip v-if="state.searchInput" :label="`Search: ${state.searchInput}`" @remove="() => { state.searchInput=''; syncUrlAndLoad(); }" removable />
				<Chip v-if="state.sort.hourlyRate" :label="`Rate: ${state.sort.hourlyRate}`" @remove="() => { state.sort.hourlyRate=''; syncUrlAndLoad(); }" removable />
				<Chip v-if="state.sort.capacity" :label="`Capacity: ${state.sort.capacity}`" @remove="() => { state.sort.capacity=''; syncUrlAndLoad(); }" removable />
				<Chip v-if="state.sort.date" :label="`Date: ${state.sort.date}`" @remove="() => { state.sort.date=''; syncUrlAndLoad(); }" removable />
				<Chip v-if="state.filter.hourlyRate != null" :label="`Max €/h: ${state.filter.hourlyRate}`" @remove="() => { state.filter.hourlyRate=null; syncUrlAndLoad(); }" removable />
				<Chip v-if="state.filter.capacity != null" :label="`Min cap.: ${state.filter.capacity}`" @remove="() => { state.filter.capacity=null; syncUrlAndLoad(); }" removable />
				<Chip v-for="am in state.filter.amenities" :key="am" :label="am" @remove="() => { state.filter.amenities = state.filter.amenities.filter(a => a!==am); syncUrlAndLoad(); }" removable />
				<Button variant="text" size="small" @click="() => { state.searchInput=''; state.sort.hourlyRate=''; state.sort.capacity=''; state.sort.date=''; state.filter.hourlyRate=null; state.filter.capacity=null; state.filter.amenities=[]; syncUrlAndLoad(); }">Clear all</Button>
			</div>
				
				<Sort @sort:action="onSortAction" />
				
			<div class="spaces">
				<template v-if="isLoading">
					<div v-for="n in 8" :key="n" class="space-skeleton"></div>
				</template>
				<template v-else>
					<SpaceCards />
					<div v-if="!spacesStoreSpaces.length && !isLoading" class="empty">
						<i class="pi pi-filter-slash empty__icon"></i>
						<p class="empty__text">No spaces match your filters.</p>
						<Button size="small" @click="() => { state.filter.hourlyRate=null; state.filter.capacity=null; state.filter.amenities=[]; state.searchInput=''; syncUrlAndLoad(); }">Reset filters</Button>
					</div>
				</template>
			</div>
				
                <!-- Infinite scroll sentinel -->
                <div ref="sentinel" class="sentinel">
                    <i v-if="isAppending" class="pi pi-spinner pi-spin"></i>
                </div>

                <Button 
                  v-if="showBackToTop"
                  class="back-to-top"
                  rounded
                  @click="backToTop"
                  :pt="{ root: { class: 'back-to-top__btn' } }"
                >
                  <i class="pi pi-arrow-up"></i>
                </Button>
			</div>
		</div>
	</div>
</template>


<style scoped>
.home {
	width: 100%;
	max-width: 1400px;
	position: relative;
	display: flex;
	flex-direction: column;
	overflow: hidden;
}

.home__header {
	width: 100%;
	text-align: center;
}

.filter-container {
	width: 100%;
	max-width: 350px;
	min-height: 100dvh;
	position: absolute;
	top: 0;
	z-index: 1000;
	transition: transform 250ms;
}

.filter-container.filter-closed {
	transform: translateX(-100%);
}

.search-filter-bar {
	width: 90%;
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	gap: 1rem;
	padding: 1rem;
}

.sort {
	width: 100%;
	padding: 1rem;
}

.spaces {
	width: 100%;
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
	justify-content: center;
	column-gap: 1rem;
	row-gap: 1rem;
	padding: 1rem;
}

.paginator {
	margin-top: 1rem;
}

.chips { display: flex; gap: 0.5rem; padding: 0 1rem; flex-wrap: wrap; }
.empty { display: flex; align-items: center; gap: 0.5rem; color: var(--p-surface-700); }
.empty__icon { color: var(--p-primary-600); }
.space-skeleton {
  height: 400px;
  border-radius: 8px;
  background: linear-gradient(90deg, rgba(0,0,0,0.04) 25%, rgba(0,0,0,0.08) 37%, rgba(0,0,0,0.04) 63%);
  background-size: 400% 100%;
  animation: shimmer 1.2s ease-in-out infinite;
}
@keyframes shimmer {
  0% { background-position: 100% 0; }
  100% { background-position: -100% 0; }
}

.sentinel { display: flex; justify-content: center; align-items: center; padding: 1rem; color: var(--p-surface-600); }
.back-to-top__btn { 
  position: fixed; 
  right: 1rem; 
  bottom: 1.2rem; 
  z-index: 3000; 
  width: 44px; height: 44px; 
  display: inline-flex; align-items: center; justify-content: center;
}

@media(min-width: 480px) {
	.filter-container {
		width: 70%;
	}
}

@media(min-width: 768px) {
	.spaces {
		grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
	}
}

@media(min-width: 1024px)  {
	.home {
		max-width: unset;
		flex-direction: row;
	}

	.home__right {
		width: 70%;
	}

	.filter-container {
		width: 30%;
		position: static;
	}
}
</style>
