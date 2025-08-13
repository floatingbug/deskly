<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import AddSpaceForm from "./components/AddSpaceForm.vue";
import addSpaceAPI from "./api/addSpaceAPI.js";
import { useToast } from "primevue/usetoast";

const router = useRouter();
const toast = useToast();
const addSpaceFormErrors = ref([]);

async function onAddSpaceFormAction(event) {
    const userInput = event.userInput;

    if (userInput.name === "") addSpaceFormErrors.value.push("Name is required.");
    if (userInput.descriptions === "") addSpaceFormErrors.value.push("Description is required.");
    if (userInput.address === "") addSpaceFormErrors.value.push("Address is required.");
    if (userInput.capacity === 0) addSpaceFormErrors.value.push("Capacity is required.");
    if (userInput.hourlyRate === 0) addSpaceFormErrors.value.push("Hourly Rate is required.");
    if (userInput.amenities.length <= 0) addSpaceFormErrors.value.push("At least one amenity is required.");

    if (addSpaceFormErrors.length > 0) return;

    const result = await addSpaceAPI({ newSpace: userInput });

    if (!result.success) {
        toast.add({ severity: "info", summary: "Space not added.", detail: result.errors[0], life: 5000 });
        return;
    }

    router.push("/dashboard");
}

function onAddSpaceFormChange(event) {
    addSpaceFormErrors.value = [];
}
</script>

<template>
    <div class="add-space">
        <h1>Add Space</h1>

        <div class="add-space-form-container">
            <AddSpaceForm
                :errors="addSpaceFormErrors"
                @addSpaceForm:action="onAddSpaceFormAction"
                @addSpaceForm:change="onAddSpaceFormChange"
            />
        </div>
    </div>
</template>

<style scoped>
h1 {
    margin-top: 4rem;
}

.add-space {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 12rem;
}

.add-space-form-container {
    width: 90%;
    max-width: 600px;
    margin-top: 2rem;
}
</style>
