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
    gap: 1rem;
    align-items: center;
    padding: 0.6rem;
    border-radius: 6px;
}
.booking-item:focus {
    outline: 2px dashed var(--p-primary-color);
    outline-offset: 2px;
}
.item-value {
    color: var(--p-primary-color);
    margin-left: auto;
}
.booking-item[aria-disabled="true"] {
    opacity: 0.6;
    pointer-events: none;
}
</style>
