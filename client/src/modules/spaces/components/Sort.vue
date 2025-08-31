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
    { name: "Hourly Rate: Low to High", value: "ascending" },
    { name: "Hourly Rate: High to Low", value: "descending" },
]);

const capacityOptions = ref([
    { name: "No Sort", value: "capacityClearSort" },
    { name: "Capacity: Low to High", value: "ascending" },
    { name: "Capacity: High to Low", value: "descending" },
]);

const dateOptions = ref([
    { name: "No Sort", value: "dateClearSort" },
    { name: "Date: Low to High", value: "ascending" },
    { name: "Date: High to Low", value: "descending" },
]);

const queryObject = {
    hourlyRate: "",
    capacity: "",
    date: "",
};


function onSelectChange({id, value}) {
    let query = "";

    // set queryObject
    if(id === "hourlyRate"){
        queryObject.hourlyRate = value === "hourlyRateClearSort" ? "" : value;
    }
    else if(id === "capacity"){
        queryObject.capacity = value === "capacityClearSort" ? "" : value;
    }
    else{
        queryObject.date = value === "dateClearSort" ? "" : value;
    }

    // create query
    if(queryObject.hourlyRate !== "") query += `hourlyRate=${queryObject.hourlyRate}&`;
    if(queryObject.capacity !== "") query += `capacity=${queryObject.capacity}&`;
    if(queryObject.date!== "") query += `date=${queryObject.date}&`;

    // emit query to parent
    emit("sort:action", {
        action: "newSortQuery",
        query,
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
            @update:modelValue="val => onSelectChange({id: 'hourlyRate', value: val})"
        />

        <Select
            v-model="sorts.capacity"
            :options="capacityOptions"
            optionLabel="name"
            optionValue="value"
            placeholder="Sort by Capacity"
            @update:modelValue="val => onSelectChange({id: 'capacity', value: val})"
        />

        <Select
            v-model="sorts.date"
            :options="dateOptions"
            optionLabel="name"
            optionValue="value"
            placeholder="Sort by Date"
            @update:modelValue="val => onSelectChange({id: 'date', value: val})"
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
