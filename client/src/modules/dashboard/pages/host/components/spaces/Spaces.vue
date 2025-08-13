<script setup>
import { ref } from "vue";
import EditSpace from "./EditSpace.vue";

const props = defineProps({
    spaces: Array,
});

const emit = defineEmits(["spaces:action"]);

const isEditDialogVisible = ref(false);
const spaceInEdit = ref(null);

function onEditSpaceAction(event) {
    if (event.action === "close") isEditDialogVisible.value = false;

    if (event.action === "changes") {
        emit("spaces:action", {
            action: "updateSpace",
            update: event.changedFields,
            spaceId: event.spaceId,
        });

        isEditDialogVisible.value = false;
    }

    if (event.action === "delete") {
        emit("spaces:action", {
            action: "deleteSpace",
            spaceId: event.spaceId,
        });

        isEditDialogVisible.value = false;
    }
}

function editSpace(space) {
    isEditDialogVisible.value = true;
    spaceInEdit.value = space;
}
</script>

<template>
    <div class="spaces-table">
        <h2>Spaces</h2>

        <div class="host-spaces">
            <div class="space" v-for="(space, index) in spaces" :key="index" @click="editSpace(space)">
                <div class="space__item">
                    <span class="space__item-name">Name:</span>
                    <span class="space__item-value">{{ space.name }}</span>
                </div>

                <div class="space__item">
                    <span class="space__item-name">Address:</span>
                    <span class="space__item-value">{{ space.address }}</span>
                </div>

                <div class="space__item">
                    <span class="space__item-name">Capacity:</span>
                    <span class="space__item-value">{{ space.capacity }}</span>
                </div>

                <div class="space__item">
                    <span class="space__item-name">Hourl Rate:</span>
                    <span class="space__item-value">{{ space.hourlyRate }}</span>
                </div>

                <div class="space__item">
                    <span class="space__item-name">Created ad:</span>
                    <span class="space__item-value">{{ space.createdAt }}</span>
                </div>

                <div class="space__item">
                    <span class="space__item-name">Status:</span>
                    <span class="space__item-value">Active</span>
                </div>
            </div>
        </div>
    </div>

    <EditSpace :isEditDialogVisible="isEditDialogVisible" :space="spaceInEdit" @editSpace:action="onEditSpaceAction">
        <template #editTitle>test title</template>
    </EditSpace>
</template>

<style scoped>
.spaces-table {
    width: 100%;
}

h2 {
    width: 100%;
    padding: 1rem;
    margin: 0;
    border-radius: 8px 8px 0 0;
    color: var(--p-primary-contrast-color);
    border: 1px solid var(--p-surface-500);
    background-color: var(--p-primary-500);
}

.host-spaces {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    border: 1px solid var(--p-surface-500);
}

.space {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    column-gap: 1rem;
    row-gap: 1.2rem;
    padding: 1.2rem;
    cursor: pointer;
    background-color: var(--p-surface-200);
    border-top: 1px solid var(--p-surface-500);
    border-bottom: 1px solid var(--p-surface-500);
}

.space:first-child {
    border-top: unset;
}

.space:last-child {
    border-bottom: unset;
}

.space:hover {
    background-color: var(--p-primary-200);
}

.space__item {
    max-width: 300px;
    display: flex;
    gap: 1rem;
}

.space__item-value {
    font-weight: bold;
    color: var(--p-primary-color);
}

@media (min-width: 1024px) {
    .spaces-table {
        max-width: unset;
    }
}
</style>
