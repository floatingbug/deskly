<script setup>
import { ref, reactive, onMounted, toRaw, computed, watch } from "vue";
import useSpacesStore from "@/stores/useSpacesStore.js";
import Slider from "primevue/slider";
import Checkbox from "primevue/checkbox";
import useDevice from "@/composables/useDevice.js";

const emit = defineEmits(["filter:action"]);

const { spacesStoreSpaces } = useSpacesStore();
const { device } = useDevice();
const filterSettings = reactive({
    hourlyRate: { value: 2, changed: false },
    capacity: { value: 1, changed: false },
    amenities: [
        { label: "WiFi", id: "wifi", isSelected: false },
        { label: "Meeting rooms", id: "meeting_rooms", isSelected: false },
        { label: "Printers", id: "printers", isSelected: false },
        { label: "Lockers", id: "lockers", isSelected: false },
        { label: "Free water", id: "free_water", isSelected: false },
        { label: "Coffee", id: "coffee", isSelected: false },
        { label: "Yoga Room", id: "yoga_room", isSelected: false },
        { label: "Terrace", id: "terrace", isSelected: false },
        { label: "Standing Desks", id: "standing_desks", isSelected: false },
        { label: "Event Area", id: "event_area", isSelected: false },
        { label: "Phone Booths", id: "phone_booths", isSelected: false },
    ],
});
let filterSettingsChanges = toRaw(filterSettings);

const selectedAmenitiesCount = computed(() => filterSettings.amenities.filter((a) => a.isSelected).length);

watch(
    () => filterSettings.hourlyRate.value,
    () => {
        filterSettings.hourlyRate.changed = true;
    },
);
watch(
    () => filterSettings.capacity.value,
    () => {
        filterSettings.capacity.changed = true;
    },
);

onMounted(() => {});

function applyFilter() {
    // build changes
    const changes = {};
    if (filterSettings.hourlyRate.changed) changes.hourlyRate = filterSettings.hourlyRate.value;
    if (filterSettings.capacity.changed) changes.capacity = filterSettings.capacity.value;
    changes.amenities = filterSettings.amenities.filter((a) => a.isSelected).map((a) => a.id);

    emit("filter:action", {
        action: "newFilterSettings",
        data: { filterSettings: changes },
    });
}

function resetFilter() {
    filterSettings.hourlyRate.changed = false;
    filterSettings.hourlyRate.value = 2;
    filterSettings.capacity.changed = false;
    filterSettings.capacity.value = 1;
    filterSettings.amenities.forEach((a) => (a.isSelected = false));

    emit("filter:action", { action: "filterReset" });
}

function closeFilter() {
    emit("filter:action", { action: "closeFilter" });
}
</script>

<template>
    <div class="filter">
        <div class="filter__head">
            <div class="filter__title">
                <i class="pi pi-sliders-h"></i>
                <h2>Filters</h2>
                <small class="filter__subtitle">Refine results by price, capacity and amenities</small>
            </div>
            <Button
                v-if="device.size < 1024"
                variant="text"
                severity="secondary"
                size="small"
                class="filter__close-btn"
                @click="closeFilter"
            >
                <i class="pi pi-times"></i>
            </Button>
        </div>

        <Divider />

        <section class="section">
            <header class="section__head">
                <h3 class="section__title">Hourly rate</h3>
                <span class="section__value">€ {{ filterSettings.hourlyRate.value }}</span>
            </header>
            <div class="section__control">
                <Slider class="filter__slider" v-model="filterSettings.hourlyRate.value" :max="200" />
                <div class="section__hints">
                    <small class="hint">Drag to set a maximum hourly price.</small>
                </div>
            </div>
        </section>

        <Divider />

        <section class="section">
            <header class="section__head">
                <h3 class="section__title">Capacity</h3>
                <span class="section__value">{{ filterSettings.capacity.value }}+</span>
            </header>
            <div class="section__control">
                <Slider class="filter__slider" v-model="filterSettings.capacity.value" :max="200" />
                <div class="section__hints">
                    <small class="hint">Minimum number of seats required.</small>
                </div>
            </div>
        </section>

        <Divider />

        <section class="section">
            <header class="section__head">
                <h3 class="section__title">Amenities</h3>
                <span class="badge" v-if="selectedAmenitiesCount">{{ selectedAmenitiesCount }}</span>
            </header>
            <div class="amenities-grid">
                <label class="amenity" v-for="(amenity, index) in filterSettings.amenities" :key="amenity.id">
                    <Checkbox v-model="amenity.isSelected" :binary="true" />
                    <span class="amenity__label">{{ amenity.label }}</span>
                </label>
            </div>
        </section>

        <div class="filter__actions">
            <Button variant="text" severity="secondary" class="btn-reset" @click="resetFilter">
                <i class="pi pi-filter-slash"></i>
                Reset
            </Button>
            <Button class="btn-apply" @click="applyFilter">
                <i class="pi pi-check"></i>
                Apply
            </Button>
        </div>
    </div>
</template>

<style scoped>
.filter {
    width: 100%;
    min-height: 100dvh;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    padding: 1rem;
    border: 1px solid var(--filter-border-color);
    background-color: var(--filter-bg-color);
    z-index: 1000;
    border-radius: 12px;
}

.filter__head {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
}
.filter__title {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
}
.filter__title h2 {
    margin: 0;
    font-size: 1.15rem;
}
.filter__title .filter__subtitle {
    color: var(--p-surface-600);
}
.filter__close-btn {
    height: 30px;
}

.section {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
}
.section__head {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 0.5rem;
}
.section__title {
    margin: 0;
    font-size: 0.95rem;
}
.section__value {
    color: var(--p-surface-700);
    font-variant-numeric: tabular-nums;
}
.section__control {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
}
.hint {
    color: var(--p-surface-600);
}

.filter__slider {
    width: 100%;
}

.amenities-grid {
    display: grid;
    grid-template-columns: repeat(1, minmax(0, 1fr));
    gap: 0.35rem 0.75rem;
}
@media (min-width: 560px) {
    .amenities-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
}
@media (min-width: 900px) {
    .amenities-grid {
        grid-template-columns: repeat(3, minmax(0, 1fr));
    }
}
.amenity {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.35rem 0.25rem;
}
.amenity__label {
    color: var(--p-surface-800);
}
.badge {
    background: var(--p-primary-100);
    color: var(--p-primary-800);
    border-radius: 999px;
    padding: 0.05rem 0.45rem;
    font-size: 0.75rem;
}

.filter__actions {
    position: sticky;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    gap: 0.5rem;
    padding-top: 0.5rem;
    background: hsl(from var(--filter-bg-color) h s l / 90%);
    backdrop-filter: blur(3px);
    border-top: 1px dashed var(--filter-border-color);
    margin-top: 0.75rem;
}
.btn-reset {
}
.btn-apply {
}

/* On mobile, avoid sticky to prevent flicker when off-canvas */
@media (max-width: 1023px) {
    .filter__actions {
        position: static;
        background: transparent;
        backdrop-filter: none;
        border-top: none;
    }
}
</style>
