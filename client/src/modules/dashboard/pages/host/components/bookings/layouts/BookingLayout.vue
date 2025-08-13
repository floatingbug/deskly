<script setup>
/*
    Generic booking wrapper layout.
    Props:
    - role: optional string to allow role-based styling/behaviour in future
*/
const props = defineProps({
    role: {
        type: String,
        required: false,
        default: "user",
    },
});
</script>

<template>
    <section class="booking" :data-role="props.role" role="list" aria-label="Bookings list">
        <slot name="booking" />
    </section>
</template>

<style scoped>
.booking {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    row-gap: 0.8rem;
    padding: 1rem;
    user-select: none;
    cursor: pointer;
    border-top: 1px solid var(--p-surface-500);
    border-bottom: 1px solid var(--p-surface-500);
    background-color: var(--p-surface-200);
}
.booking:first-child {
    border-top: unset;
}
.booking:last-child {
    border-bottom: unset;
}
.booking:hover {
    background-color: var(--p-primary-200);
}
</style>
