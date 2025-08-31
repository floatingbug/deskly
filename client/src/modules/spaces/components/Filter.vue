<script setup>
import {reactive, watch } from "vue";
import Slider from "primevue/slider";
import Chip from "primevue/chip";
import useDevice from "@/composables/useDevice.js";

const emit = defineEmits(["filter:action"]);

const { device } = useDevice();
const filterSettings = reactive({
    hourlyRate: { value: 10, defaultValue: 10, hasBeenChanged: false},
    capacity: { value: 1, defaultValue: 1, hasBeenChanged: false},
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


watch(
    () => filterSettings.hourlyRate.value,
    () => {
        if(filterSettings.hourlyRate.value !== filterSettings.hourlyRate.defaultValue)
        {
            filterSettings.hourlyRate.hasBeenChanged= true;
        }
        else filterSettings.hourlyRate.hasBeenChanged = false;
    },
);
watch(
    () => filterSettings.capacity.value,
    () => {
        if(filterSettings.capacity.value !== filterSettings.capacity.defaultValue)
        {
            filterSettings.capacity.hasBeenChanged = true;
        }
        else filterSettings.capacity.hasBeenChanged = false;
    },
);


function applyFilter() {
    let query = "";

    if (filterSettings.hourlyRate.hasBeenChanged) query = `f_hourlyRate=${filterSettings.hourlyRate.value}&`;
    if (filterSettings.capacity.hasBeenChanged) query += `f_capacity=${filterSettings.capacity.value}`;

    const selectedAmenities = filterSettings.amenities.filter(amenity => amenity.isSelected);
    if(selectedAmenities.length > 0){
        query += selectedAmenities.reduce((accumulator, amenity, index) => {
            accumulator += (index > 0 ? "," : "") + amenity.id;
            return accumulator;
        }, "f_amenities=");
    }

    emit("filter:action", {
        action: "newFilterQuery",
        query,
    });
}

function resetFilter() {
    filterSettings.hourlyRate.hasBeenChanged = false;
    filterSettings.hourlyRate.value = 10;
    filterSettings.capacity.hasBeenChanged = false;
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
        <section>
            <div class="title">
                <div class="title__left">
                    <i class="pi pi-filter"></i>
                    <span>Filter</span>
                </div>
                
                <div class="title__right">
                    <Button
                        v-if="device.size <= 1024"
                        severity="secondary"
                        variant="text"
                        rounded
                        @click="closeFilter"
                    >
                        <i class="pi pi-times-circle" style="font-size: 1.5rem"></i>
                    </Button>
                </div>
            </div>

        </section>

        <section>
            <div class="sliders">
                <div class="slider">
                    <div class="slider__label-input">
                        <div class="slider__label">Max. Hourly Rate</div>
                        <div class="slider__input">
                            <InputText 
                                v-model.number="filterSettings.hourlyRate.value" 
                                size="small"
                            />
                        </div>
                    </div>

                    <Slider v-model="filterSettings.hourlyRate.value" :max="20"></Slider>
                </div>
                
                <div class="slider">
                    <div class="slider__label-input">
                        <div class="slider__label">Capacity</div>
                        <div class="slider__input">
                            <InputText 
                                v-model.number="filterSettings.capacity.value" 
                                size="small"
                            />
                        </div>
                    </div>

                    <Slider v-model="filterSettings.capacity.value"></Slider>
                </div>
            </div>
        </section>

        <section>
            <div class="amenities">
                <Chip
                    v-for="(amenity, index) in filterSettings.amenities"
                    :key="index"
                    :class="amenity.isSelected ? 'selected-amenity' : ''"
                    @click="amenity.isSelected = !amenity.isSelected;"
                >
                    {{amenity.label}}
                </Chip>
            </div>
        </section>

        <section>
            <div class="footer">
                <Button
                    severity="secondary"
                    @click="resetFilter"
                >
                    Reset
                </Button>
                
                <Button
                    @click="applyFilter"
                >
                    Apply
                </Button>
            </div>
        </section>
    </div>
</template>

<style scoped>
.filter {
    width: 100%;
    min-height: 800px;
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xl);
    padding: var(--spacing-md);
    background-color: hsl(from var(--bg-surface) h s l / 80%);
    backdrop-filter: blur(8px);
}

.title {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.title__left {
    display: flex;
    gap: var(--spacing-sm);
}

.sliders {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-lg);
}

.slider {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
}

.slider__label-input{
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
}

.slider__label {
    width: 80px;
    font-size: var(--font-size-sm);
}

.slider__input {
    width: 50px;
}

.slider__input .p-inputtext {
    width: 100%;
}

.amenities {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-sm);
    user-select: none;
    cursor: pointer;
}

.selected-amenity {
    color: var(--color-text-contrast);
    background-color: var(--bg-surface-dark);
}

.footer {
    display: flex;
    justify-content: flex-end;
        gap: var(--spacing-md);
}

@media(min-width: 1024px){
    .filter{
        border-radius: var(--radius-md);
    }
}
</style>
