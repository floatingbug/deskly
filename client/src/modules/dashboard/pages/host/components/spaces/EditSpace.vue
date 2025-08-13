<script setup>
import { ref, reactive, watch } from "vue";

const props = defineProps({
    isEditDialogVisible: Boolean,
    space: Object,
});

const emit = defineEmits(["editSpace:action"]);

const amenitiesSchema = [
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
];
const fieldsOnEdit = reactive({
    name: "",
    description: "",
    address: "",
    capacity: 0,
    hourlyRate: 0,
    amenities: amenitiesSchema,
});
const showDeleteModal = ref(false);

// update fieldsOnEdit object if space changed
watch(
    () => props.space,
    () => {
        // update props without amenities
        const { amenities, ...spaceWithoutAmenities } = props.space;

        for (const key in spaceWithoutAmenities) {
            fieldsOnEdit[key] = spaceWithoutAmenities[key];
        }

        // update amenities
        fieldsOnEdit.amenities = JSON.parse(JSON.stringify(amenitiesSchema));

        fieldsOnEdit.amenities.forEach((amenityA) => {
            props.space.amenities.forEach((amenityB) => {
                if (amenityA.id === amenityB.id) amenityA.isSelected = true;
            });
        });
    },
);

function onDialogUpdate(event) {
    emit("editSpace:action", {
        action: "close",
    });
}

function emitChanges() {
    let changedFields = {};

    // add only changed fields to changedFields
    for (const key in fieldsOnEdit) {
        if (fieldsOnEdit[key] !== props.space[key]) changedFields[key] = fieldsOnEdit[key];
    }

    // only amenites with isSelected === true remains
    changedFields.amenities = changedFields.amenities
        .filter((amenity) => amenity.isSelected)
        .map((amenity) => ({
            id: amenity.id,
            label: amenity.label,
        }));

    emit("editSpace:action", {
        action: "changes",
        changedFields,
        spaceId: props.space._id,
    });
}

function emitDelete() {
    emit("editSpace:action", {
        action: "delete",
        spaceId: props.space._id,
    });

    showDeleteModal.value = false;
}

function undoChanges() {
    for (const key in props.space) {
        if (key !== "amenities") fieldsOnEdit[key] = props.space[key];
    }

    // set all amenities.isSelected to false
    fieldsOnEdit.amenities.forEach((amenity) => (amenity.isSelected = false));

    // set amenities.isSelected to true which are also true in space.amenities
    props.space.amenities.forEach((spaceAmenity) => {
        fieldsOnEdit.amenities.find((amenity) => amenity.id === spaceAmenity.id).isSelected = true;
    });
}
</script>

<template>
    <Dialog
        :visible="isEditDialogVisible"
        @update:visible="onDialogUpdate"
        modal
        :pt="{
            root: {
                style: 'overflow: hidden',
            },
            header: {
                style: 'background-color: var(--p-primary-300); border-bottom: 1px solid var(--p-surface-500);',
            },
            footer: {
                style: 'background-color: var(--p-primary-300); margin-top: 2rem; border-top: 1px solid var(--p-surface-500);',
            },
        }"
    >
        <template #header>
            <span>Edit:</span>
            <span>{{ space.name }}</span>
        </template>

        <div class="edit-container">
            <div class="input-item">
                <div class="input-name">Name:</div>

                <div class="input-field">
                    <InputText v-model="fieldsOnEdit.name" :placeholder="space.name" />
                </div>
            </div>

            <div class="input-item">
                <div class="input-name">Description:</div>

                <div class="input-field">
                    <Textarea v-model="fieldsOnEdit.description" :placeholder="space.description" autoResize />
                </div>
            </div>

            <div class="input-item">
                <div class="input-name">Address:</div>

                <div class="input-field">
                    <InputText v-model="fieldsOnEdit.address" :placeholder="space.address" />
                </div>
            </div>

            <div class="input-item">
                <div class="input-name">Capacity:</div>

                <div class="input-field">
                    <InputNumber
                        v-model="fieldsOnEdit.capacity"
                        inputId="horizontal-buttons"
                        showButtons
                        buttonLayout="horizontal"
                        :step="0.25"
                        fluid
                    >
                        <template #incrementbuttonicon>
                            <span class="pi pi-plus" />
                        </template>
                        <template #decrementbuttonicon>
                            <span class="pi pi-minus" />
                        </template>
                    </InputNumber>
                </div>
            </div>

            <Divider></Divider>

            <div class="input-item-amanities">
                <div class="input-name">Amenities:</div>

                <div class="amenities">
                    <chip
                        v-for="(amenity, index) in fieldsOnEdit.amenities"
                        :key="index"
                        :class="amenity.isSelected ? 'selected-amenity' : ''"
                        @click="amenity.isSelected = !amenity.isSelected"
                    >
                        {{ amenity.label }}
                    </chip>
                </div>
            </div>

            <Divider></Divider>

            <div class="input-item">
                <div class="input-name">Hourly Rate:</div>

                <div class="input-field">
                    <InputNumber
                        v-model="fieldsOnEdit.hourlyRate"
                        inputId="horizontal-buttons"
                        showButtons
                        buttonLayout="horizontal"
                        :step="0.25"
                        mode="currency"
                        currency="USD"
                        fluid
                    >
                        <template #incrementbuttonicon>
                            <span class="pi pi-plus" />
                        </template>
                        <template #decrementbuttonicon>
                            <span class="pi pi-minus" />
                        </template>
                    </InputNumber>
                </div>
            </div>
        </div>

        <template #footer>
            <div class="buttons">
                <div class="buttons-top">
                    <Button @click="undoChanges">Cancel Changes</Button>

                    <Button @click="emitChanges">Submit Changes</Button>
                </div>

                <div class="buttons-delete">
                    <Button severity="danger" @click="showDeleteModal = true">Delete Space</Button>
                </div>
            </div>
        </template>
    </Dialog>

    <Dialog
        :visible="showDeleteModal"
        @update:visible="onDialogUpdate"
        modal
        :pt="{
            root: {
                style: 'overflow: hidden',
            },
            header: {
                style: 'background-color: var(--p-primary-300); border-bottom: 1px solid var(--p-surface-500);',
            },
            footer: {
                style: 'background-color: var(--p-primary-300); margin-top: 2rem; border-top: 1px solid var(--p-surface-500);',
            },
        }"
    >
        <template #header>
            <span>Delete:</span>
            {{ space.name }}
        </template>

        <div class="delete-modal-description">Delete this Space?</div>

        <div class="delete-modal-buttons">
            <Button @click="showDeleteModal = false">Cancel</Button>

            <Button @click="emitDelete">Delete</Button>
        </div>
    </Dialog>
</template>

<style scoped>
.edit-container {
    max-width: 400px;
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    margin-top: 2.8rem;
}

.input-item {
    width: 100%;
    max-width: 400px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
}

.input-name {
    width: 35%;
}

.input-field {
    width: 65%;
}

.p-inputtext {
    width: 100%;
}

.p-inputnumber :deep(.p-component) {
    width: 100%;
}

.p-textarea {
    width: 100%;
}

.buttons {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    margin-top: 1.2rem;
}

.buttons-top {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
}

.buttons-delete {
    display: flex;
    justify-content: flex-end;
}

.input-item-amanities {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
}

.amenities {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 0.8rem;
}

.p-chip {
    cursor: pointer;
    user-select: none;
    background-color: var(--p-surface-200);
}

.selected-amenity {
    background-color: var(--p-primary-200);
}

.delete-modal-description {
    padding: 1.2rem;
}

.delete-modal-buttons {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
}
</style>
