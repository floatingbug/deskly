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
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: 1rem;
    padding: 1.25rem;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    border: 1.5px solid #e9ecef;
    transition: all 0.2s ease;
    cursor: pointer;
}

.booking:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background: #f8f9fa;
}

.booking:active {
    transform: translateY(0);
}
</style>
