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
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    overflow: hidden;
}

header {
    padding: 1.25rem 1.5rem;
    background: #f8f9fa;
    border-bottom: 2px solid #ced4da;
}

header h2 {
    font-size: 1.25rem;
    font-weight: 600;
    color: #1a1a1a;
    margin: 0;
}

main {
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

footer {
    padding: 1rem 1.5rem;
    background: #f8f9fa;
    border-top: 2px solid #ced4da;
}
</style>
