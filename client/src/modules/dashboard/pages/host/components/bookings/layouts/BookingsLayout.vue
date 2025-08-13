<script setup>
/*
    Container layout for a set of bookings.
    Accessibility and clear semantic structure added.
*/
const props = defineProps({
    headerLabel: {
        type: String,
        required: false,
        default: "",
    },
});
</script>

<template>
    <div class="bookings" role="region" :aria-label="headerLabel || 'Bookings'">
        <header>
            <h2 class="header__label">
                <slot name="header">
                    {{ headerLabel }}
                </slot>
            </h2>
        </header>

        <main>
            <slot name="main" />
        </main>

        <footer>
            <slot name="footer" />
        </footer>
    </div>
</template>

<style scoped>
.bookings {
    width: 100%;
    min-width: 280px;
    display: flex;
    flex-direction: column;
}
header {
    padding: 1rem;
    border-radius: 8px 8px 0 0;
    border: 1px solid var(--p-surface-500);
    color: var(--p-primary-contrast-color);
    background-color: var(--p-primary-500);
}
header h2 {
    margin: 0;
}
main {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    border: 1px solid var(--p-surface-500);
    padding: 0.6rem;
}
footer {
    margin-top: 0.6rem;
}
</style>
