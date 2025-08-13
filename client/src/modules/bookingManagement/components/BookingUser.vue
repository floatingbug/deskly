<script setup>
import { computed } from "vue";
import Button from "primevue/button";

/*
    Props:
    - user: expected Object { id?, name?, email?, ... }
*/
const props = defineProps({
    user: {
        type: Object,
        required: true,
        default: () => ({}),
    },
});

const emit = defineEmits(["send-message"]);

/* computed to avoid re-evaluating in template and guard missing fields */
const userName = computed(() => props.user?.name ?? "—");
const userEmail = computed(() => props.user?.email ?? "—");

function onSendMessage() {
    emit("send-message", { userId: props.user?.id ?? null });
}
</script>

<template>
    <div class="booking-user" role="group" aria-label="Booking user information">
        <div class="user-item" aria-hidden="false">
            <div class="name">Name:</div>
            <div class="value">
                {{ userName }}
            </div>
        </div>

        <div class="user-item" aria-hidden="false">
            <div class="name">E-Mail:</div>
            <div class="value">
                <a :href="`mailto:${userEmail}`" v-if="userEmail !== '—'">{{ userEmail }}</a>
                <span v-else>{{ userEmail }}</span>
            </div>
        </div>

        <div class="send-message-button">
            <!-- PrimeVue Button (imported in script setup) -->
            <Button
                label="Nachricht senden"
                icon="pi pi-envelope"
                @click="onSendMessage"
                :disabled="userEmail === '—'"
                aria-label="Send message to user"
            />
        </div>
    </div>
</template>

<style scoped>
.booking-user {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
}
.user-item {
    width: 100%;
    display: flex;
    padding: 1rem;
    background-color: var(--p-surface-200);
    align-items: center;
}
.name {
    width: 30%;
    font-weight: 600;
}
.value {
    width: 70%;
    word-break: break-word;
}
.send-message-button {
    display: flex;
    justify-content: flex-end;
    padding-top: 0.5rem;
}
a {
    color: inherit;
    text-decoration: underline;
}
</style>
