<script setup>
import { ref, toRaw, watch } from "vue";
import { useToast } from "primevue/usetoast";
import AddPictures from "../molecules/AddPictures.vue";


const emit = defineEmits(["addSpaceForm:action", "addSpaceForm:change"]);

const props = defineProps({
    errors: Array,
});

const fields = ref([
	{
		id: "uploadImage",
		type: "uploadImage",
	},
    {
        label: "Name",
        value: "",
        icon: "pi pi-tag",
        id: "name",
        type: "inputText",
    },
    {
        label: "Description",
        value: "",
        icon: "pi pi-tag",
        id: "description",
        type: "textarea",
    },
    {
        label: "Address",
        value: "",
        icon: "pi pi-tag",
        id: "address",
        type: "inputText",
    },
    {
        label: "Capacity",
        value: 0,
        icon: "pi pi-tag",
        id: "capacity",
        type: "inputNumber",
    },
    {
        label: "Amenities",
        icon: "pi pi-tag",
        id: "amenities",
        type: "checkboxes",
        amenities: [
            {
                label: "Event Area",
                id: "event_area",
                isSelected: false,
            },
            {
                label: "Phone Booths",
                id: "phone_booths",
                isSelected: false,
            },
            {
                label: "Terrace",
                id: "terrace",
                isSelected: false,
            },
            {
                label: "Coffee",
                id: "coffee",
                isSelected: false,
            },
            {
                label: "WiFi",
                id: "wifi",
                isSelected: false,
            },
            {
                label: "Yoga Room",
                id: "yoga_room",
                isSelected: false,
            },
            {
                label: "Standing Desks",
                id: "standing_desks",
                isSelected: false,
            },
            {
                label: "Free Water",
                id: "free_water",
                isSelected: false,
            },
            {
                label: "Meeting Rooms",
                id: "meeting_rooms",
                isSelected: false,
            },
            {
                label: "Printers",
                id: "printers",
                isSelected: false,
            },
            {
                label: "Lockers",
                id: "lockers",
                isSelected: false,
            },
        ],
    },
    {
        label: "Hourly Rate",
        value: 0,
        icon: "pi pi-tag",
        id: "hourlyRate",
        type: "inputNumber",
        isSelected: false,
    },
]);

const fieldsCopy = JSON.parse(JSON.stringify(toRaw(fields.value)));
const uploadUrl = `${import.meta.env.VITE_SERVER_URL}/upload-pictures`
let selectedImages;


watch(
    () => fields,
    () => {
        emit("addSpaceForm:change", {});
    },
    { deep: true },
);

function onAddPictureActions(event){
	selectedImages = event.images;
}

async function addSpace() {
    let rawFields = toRaw(fields.value);

    const userInput = rawFields.reduce((accumulator, field) => {
        if (field.type === "inputText" || field.type === "textarea" || field.type === "inputNumber") {
            accumulator[field.id] = field.value;
        }

        if (field.type === "checkboxes") {
            accumulator.amenities = field.amenities
                .filter((amenity) => amenity.isSelected)
                .map((amenity) => ({ id: amenity.id, label: amenity.label }));
        }

        return accumulator;
    }, {});

    emit("addSpaceForm:action", {
        action: "submit",
        userInput,
		images: selectedImages,
    });

    // reset fields
    fields.value = fieldsCopy;
}
</script>

<template>
    <div class="add-space-form">
        <div class="form-field" v-for="(field, index) in fields" :key="index">
			<div class="upload-image"
				v-if="field.type === 'uploadImage'"
			>
				<AddPictures @addPictures:action="onAddPictureActions" />
			</div>

            <InputGroup v-if="field.type === 'inputText'">
                <InputGroupAddon>
                    <i :class="field.icon"></i>
                </InputGroupAddon>

                <FloatLabel>
                    <InputText v-model="field.value" />
                    <label :for="field.id">{{ field.label }}</label>
                </FloatLabel>
            </InputGroup>

            <InputGroup v-if="field.type === 'inputNumber'">
                <InputGroupAddon>
                    <i :class="field.icon"></i>
                </InputGroupAddon>

                <FloatLabel>
                    <InputNumber
                        v-if="field.id === 'hourlyRate'"
                        v-model="field.value"
                        inputId="horizontal-buttons"
                        showButtons
                        buttonLayout="horizontal"
                        :step="0.25"
                        mode="currency"
                        currency="EUR"
                        fluid
                    />
                    <InputNumber
                        v-else
                        v-model="field.value"
                        inputId="horizontal-buttons"
                        showButtons
                        buttonLayout="horizontal"
                        :step="0.25"
                        mode="decimal"
                        fluid
                    />

                    <label :for="field.id">{{ field.label }}</label>
                </FloatLabel>
            </InputGroup>

            <InputGroup v-if="field.type === 'textarea'">
                <InputGroupAddon>
                    <i :class="field.icon"></i>
                </InputGroupAddon>

                <FloatLabel>
                    <Textarea class="textarea" v-model="field.value" />
                    <label :for="field.id">{{ field.label }}</label>
                </FloatLabel>
            </InputGroup>

            <div class="amenities" v-if="field.type === 'checkboxes'">
                <h2>Choose Amenities</h2>

                <Chip
                    class="amenity"
                    v-for="(amenity, index) in field.amenities"
                    :class="amenity.isSelected ? 'amenity-selected' : ''"
                    :label="amenity.label"
                    @click="amenity.isSelected = !amenity.isSelected"
                />
            </div>
        </div>

        <ul class="errors" v-if="errors.length > 0">
            <li v-for="(error, index) in errors" :key="index">
                {{ error }}
            </li>
        </ul>

        <div class="buttons">
            <Button @click="addSpace">Add Space</Button>
        </div>
    </div>
</template>

<style scoped>
.add-space-form {
    display: flex;
    flex-direction: column;
    gap: 2.4rem;
}

.textarea {
    width: 100%;
    resize: none;
}

.buttons {
    width: 100%;
    display: flex;
    justify-content: flex-end;
}

.amenity {
    user-select: none;
    cursor: pointer;
}

.amenity-selected {
    color: var(--p-primary-contrast-color);
    background-color: var(--p-primary-color);
}
</style>
