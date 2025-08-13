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
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    overflow: hidden;
}

h2 {
    font-size: 1.5rem;
    font-weight: 600;
    color: #1a1a1a;
    padding: 1.25rem 1.5rem;
    margin: 0;
    background: #f8f9fa;
    border-bottom: 1px solid #e9ecef;
}

.host-spaces {
    padding: 1.5rem;
}

.space {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 1.5rem;
    padding: 1.5rem;
    background: white;
    border-radius: 12px;
    transition: all 0.2s ease;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    border: 2px solid #ced4da;
    margin-bottom: 1.5rem;
}

.space:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    border-color: #4dabf7;
    border-width: 2px;
    background: #f8f9fa;
}

.space__item {
    display: flex;
    justify-content: space-between;
    gap: 0.75rem;
    padding: 1rem;
    margin: 0 0.5rem;
    background: #f8f9fa;
    border-radius: 8px;
    border: 1px solid #dee2e6;
    transition: all 0.2s ease;
}

.space__item:hover {
    background: #e7f5ff;
    border-color: #a5d8ff;
}

.space__item:nth-child(even) {
    background: #f1f3f5;
}

.space__item-name {
    color: #4a5568;
    font-size: 0.95rem;
    font-weight: 500;
}

.space__item-value {
    color: #2d3436;
    font-weight: 600;
    font-size: 0.95rem;
    color: #2b6cb0;
}

@media (min-width: 1024px) {
    .spaces-table {
        margin: 0 auto;
        max-width: 1400px;
    }
    
    .space {
        grid-template-columns: repeat(3, 1fr);
    }
}
</style>
