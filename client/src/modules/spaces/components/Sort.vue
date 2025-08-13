<script setup>
import { ref, reactive } from "vue";
import Select from "primevue/select";

const emit = defineEmits(["sort:action"]);

const sorts = reactive({
    hourlyRate: "",
    capacity: "",
});
const hourlyRateOptions = ref([
    { name: "No Sort", value: "hourlyRateClearSort" },
    { name: "Hourly Rate: Low to High", value: "hourlyRateAscending" },
    { name: "Hourly Rate: High to Low", value: "hourlyRateDescending" },
]);
const capacityOptions = ref([
    { name: "No Sort", value: "capacityClearSort" },
    { name: "Capacity: Low to High", value: "capacityAscending" },
    { name: "Capacity: High to Low", value: "capacityDescending" },
]);

const dateOptions = ref([
    { name: "No Sort", value: "dateClearSort" },
    { name: "Date: Low to High", value: "dateAscending" },
    { name: "Date: High to Low", value: "dateDescending" },
]);

function onSelectChange(event) {
    const value = event.value;

    if (value === "hourlyRateClearSort") sorts.hourlyRate = null;
    if (value === "capacityClearSort") sorts.capacity = null;
    if (value === "dateClearSort") sorts.date = null;

    emit("sort:action", {
        action: value,
    });
}
</script>

<template>
    <div class="sort">
        <Select
            v-model="sorts.hourlyRate"
            :options="hourlyRateOptions"
            optionLabel="name"
            optionValue="value"
            placeholder="Sort by Hourly Rate"
            @change="onSelectChange"
        />

        <Select
            v-model="sorts.capacity"
            :options="capacityOptions"
            optionLabel="name"
            optionValue="value"
            placeholder="Sort by Capacity"
            @change="onSelectChange"
        />

        <Select
            v-model="sorts.date"
            :options="dateOptions"
            optionLabel="name"
            optionValue="value"
            placeholder="Sort by Date"
            @change="onSelectChange"
        />
    </div>
</template>

<style scoped>
.sort {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
}
</style>
