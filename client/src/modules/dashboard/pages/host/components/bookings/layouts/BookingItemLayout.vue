<script setup>
import { computed } from "vue";

/*
    Booking item layout:
    - Emits 'select' when clicked (or Enter/Space pressed)
    - Props:
        itemId: id of booking (used for emit)
*/
const props = defineProps({
    itemId: {
        type: [String, Number],
        required: true,
    },
    disabled: {
        type: Boolean,
        default: false,
    },
});

const emit = defineEmits(["select"]);

const ariaLabel = computed(() => `Booking item ${props.itemId}`);

function onSelect(event) {
    if (props.disabled) {
        event?.preventDefault();
        return;
    }
    emit("select", props.itemId);
}

function onKeydown(event) {
    if (props.disabled) return;
    if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        emit("select", props.itemId);
    }
}
</script>

<template>
    <div
        class="booking-item"
        role="listitem"
        :aria-label="ariaLabel"
        tabindex="0"
        @click="onSelect"
        @keydown="onKeydown"
        :aria-disabled="disabled"
    >
        <div class="item-name">
            <slot name="name" />
        </div>

        <div class="item-value">
            <slot name="value" />
        </div>
    </div>
</template>

<style scoped>
.booking-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem 1rem;
    background: white;
    border-radius: 6px;
    transition: background 0.2s ease;
}

.booking-item:hover {
    background: #f8f9fa;
}

.booking-item:focus {
    outline: 2px solid #4dabf7;
    outline-offset: 2px;
}

.item-name {
    font-size: 0.9rem;
    color: #6c757d;
}

.item-value {
    font-weight: 500;
    color: #2d3436;
    font-size: 0.95rem;
}

.booking-item[aria-disabled="true"] {
    opacity: 0.5;
    background: #f8f9fa;
}
</style>
