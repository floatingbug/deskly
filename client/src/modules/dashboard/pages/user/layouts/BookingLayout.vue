<script setup>
import { ref, onMounted, watch, nextTick } from "vue";
import convertUtcTimeStringToLocalTimeString from "../utils/convertUtcTimeStringToLocalTimeString.js";

const props = defineProps({
    bookings: Array,
    panels: Object,
});

const isInitialized = ref(false);
const messages = ref({});
const localPanels = ref({});

onMounted(() => {
    isInitialized.value = true;
});

watch(
    () => props.panels,
    (next) => {
        try {
            localPanels.value = { ...(next || {}) };
        } catch {
            localPanels.value = {};
        }
    },
    { immediate: true, deep: true },
);

function togglePanel(bookingId) {
    if (localPanels.value[bookingId]) {
        localPanels.value[bookingId].isOpen = !localPanels.value[bookingId].isOpen;
    }
}

function closePanel(event, bookingId) {
    event.stopPropagation();
    if (localPanels.value[bookingId]) localPanels.value[bookingId].isOpen = false;
}

function formatDate(dateStr) {
    try {
        return new Date(dateStr).toLocaleDateString();
    } catch {
        return dateStr;
    }
}

function formatTime(timeStr) {
    try {
        return convertUtcTimeStringToLocalTimeString(timeStr);
    } catch {
        return timeStr;
    }
}

function getStatus(booking) {
    const now = new Date();
    const start = new Date(booking.startDate);
    const end = new Date(booking.endDate);
    if (start <= now && now <= end) return { label: "Current", severity: "success" };
    if (start > now) return { label: "Upcoming", severity: "info" };
    return { label: "Past", severity: "secondary" };
}

function getSampleImage(index) {
    const samples = ["/images/spaces/space-1.svg", "/images/spaces/space-2.svg", "/images/spaces/space-3.svg"];
    return samples[index % samples.length];
}
</script>

<template>
    <div class="bookings" v-if="isInitialized">
        <div
            v-for="(booking, index) in bookings"
            :key="booking._id"
            class="booking-card"
            :class="{ 'booking-card--open': localPanels.value?.[booking._id]?.isOpen }"
            @click="togglePanel(booking._id)"
            role="button"
            tabindex="0"
            @keyup.enter="togglePanel(booking._id)"
        >
            <header class="booking-card__header">
                <img
                    class="booking-card__thumb"
                    :src="getSampleImage(index)"
                    alt=""
                    aria-hidden="true"
                    width="72"
                    height="72"
                />
                <div class="booking-card__title">
                    <h3 class="booking-card__space">{{ booking.space.name }}</h3>
                    <div class="booking-card__subline">
                        <div class="subline-row">
                            <span class="item">
                                <i class="pi pi-calendar" aria-hidden="true"></i>
                                <span class="value">{{ formatDate(booking.startDate) }}</span>
                            </span>
                            <span class="dash">–</span>
                            <span class="item">
                                <span class="value">{{ formatDate(booking.endDate) }}</span>
                            </span>
                            <span class="dot">•</span>
                            <span class="item">
                                <i class="pi pi-clock" aria-hidden="true"></i>
                                <span class="value">{{ formatTime(booking.startTime) }}</span>
                            </span>
                        </div>
                        <div class="subline-row subline-row--secondary">
                            <span class="item">
                                <span class="value">{{ booking.space.location }}</span>
                            </span>
                        </div>
                    </div>
                </div>
                <div class="booking-card__status">
                    <Chip
                        :label="getStatus(booking).label"
                        :pt="{ root: { class: `chip chip--${getStatus(booking).severity}` } }"
                    />
                </div>
            </header>

            <section class="booking-card__body">
                <div class="booking-card__section">
                    <div class="row">
                        <span class="label">Start</span>
                        <span class="value">
                            {{ formatDate(booking.startDate) }} • {{ formatTime(booking.startTime) }}
                        </span>
                    </div>
                    <div class="row">
                        <span class="label">End</span>
                        <span class="value">{{ formatDate(booking.endDate) }}</span>
                    </div>
                </div>

                <Divider layout="vertical" class="divider-vertical" />

                <div class="booking-card__section booking-card__section--right">
                    <div class="row">
                        <span class="label">Hourly rate</span>
                        <span class="value">${{ booking.space.hourlyRate }}</span>
                    </div>
                    <div class="row">
                        <span class="label">Total</span>
                        <span class="value value--emph">${{ localPanels.value?.[booking._id]?.totalAmount ?? 0 }}</span>
                    </div>
                </div>
            </section>

            <footer class="booking-card__actions" @click.stop>
                <div class="right">
                    <slot
                        name="contactHostButton"
                        :creatorId="booking.space.creatorId"
                        :message="messages[booking._id]"
                    />
                    <slot name="cancelBookingButton" :bookingId="booking._id" />
                </div>
            </footer>

            <slot name="messageDialog" :creatorId="booking.space.creatorId" />

            <transition name="collapse">
                <section v-if="localPanels.value?.[booking._id]?.isOpen" class="booking-card__details" @click.stop>
                    <Divider />
                    <p class="description">{{ booking.space.description }}</p>
                    <Button
                        class="booking-card__collapse"
                        variant="text"
                        size="small"
                        @click="closePanel($event, booking._id)"
                    >
                        <i class="pi pi-chevron-up"></i>
                        Hide details
                    </Button>
                </section>
            </transition>
        </div>
    </div>
</template>

<style scoped>
.bookings {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.25rem;
}

.booking-card {
    border-radius: 12px;
    background: var(--p-surface-0);
    box-shadow: var(--p-shadow-2);
    cursor: pointer;
    overflow: hidden;
    transition:
        box-shadow 0.3s ease,
        transform 0.2s ease;
    border: 1px solid transparent;
    display: flex;
    flex-direction: column;
}

.booking-card:hover,
.booking-card:focus-visible {
    box-shadow: var(--p-shadow-5);
    transform: translateY(-4px);
    border-color: var(--p-primary-400);
    outline: none;
}

.booking-card__header {
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    gap: 0.9rem;
    padding: 1rem 1.2rem;
    background-color: var(--p-primary-50);
    user-select: none;
}

.booking-card__thumb {
    width: 72px;
    height: 72px;
    border-radius: 10px;
    object-fit: cover;
    flex-shrink: 0;
    box-shadow: var(--p-shadow-3);
}

.booking-card__space {
    margin: 0;
    font-weight: 600;
    font-size: clamp(1rem, 1.6vw, 1.2rem);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.booking-card__title {
    display: flex;
    flex-direction: column;
    min-width: 0;
}

.booking-card__subline {
    color: var(--p-text-secondary);
    font-size: clamp(0.85rem, 1.2vw, 1rem);
    margin-top: 0.35rem;
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
}

.booking-card__subline .subline-row {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    flex-wrap: wrap;
}

.booking-card__subline .subline-row--secondary {
    color: var(--p-surface-600);
}

.booking-card__subline .item {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
}

.booking-card__subline .pi {
    color: var(--p-primary-600);
    font-size: 1rem;
}

.booking-card__subline .dot,
.booking-card__subline .dash {
    color: var(--p-surface-600);
}

.booking-card__subline .value {
    color: var(--p-text-primary);
}

.chip {
    border-radius: 9999px;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 0.85rem;
    padding: 0.25rem 1rem;
    user-select: none;
}

.chip--success {
    background: var(--p-green-100);
    color: var(--p-green-700);
}

.chip--info {
    background: var(--p-blue-100);
    color: var(--p-blue-700);
}

.chip--secondary {
    background: var(--p-surface-200);
    color: var(--p-text-secondary);
}

.booking-card__body {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
    padding: 1rem 1.2rem;
    border-top: 1px solid var(--p-surface-200);
}

@media (min-width: 700px) {
    .booking-card__body {
        grid-template-columns: 1fr 1fr;
    }
}

.divider-vertical {
    display: none;
}

.booking-card__section--right {
    border-left: 1px dashed var(--p-surface-300);
    padding-left: 1rem;
}

.booking-card__actions {
    padding: 1rem 1.2rem 1.25rem 1.2rem;
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    border-top: 1px solid var(--p-surface-200);
    user-select: none;
}

.booking-card__actions .right {
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
}

.booking-card__collapse {
    margin-top: 0.75rem;
    font-weight: 600;
    color: var(--p-primary-600);
    cursor: pointer;
}

.booking-card__details {
    padding: 1rem 1.2rem 1.5rem 1.2rem;
    background-color: var(--p-surface-50);
    border-top: 1px solid var(--p-surface-200);
    user-select: text;
    overflow-wrap: break-word;
}

.description {
    margin: 0;
    color: var(--p-text-primary);
    font-size: 1rem;
    line-height: 1.4;
}

/* Collapse animation */
.collapse-enter-active,
.collapse-leave-active {
    transition:
        max-height 0.35s ease,
        opacity 0.35s ease;
}
.collapse-enter-from,
.collapse-leave-to {
    max-height: 0;
    opacity: 0;
    overflow: hidden;
}
.collapse-enter-to,
.collapse-leave-from {
    max-height: 500px;
    opacity: 1;
    overflow: visible;
}
</style>
