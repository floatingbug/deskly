<script setup>
import { ref, onMounted, watch, computed } from "vue";
import { useRouter } from "vue-router";
import BookingLayout from "../layouts/BookingLayout.vue";
import useUserStore from "@/stores/useUserStore.js";
import evalTotalAmount from "../utils/evalTotalAmount.js";

const emit = defineEmits(["bookings:action"]);
const props = defineProps({
    searchQuery: {
        type: String,
        default: "",
    },
});

const router = useRouter();
const { user } = useUserStore();
const panels = ref({});
const isInitialized = ref(false);
const bookings = ref([]);
const isMessageDialogVisible = ref(false);
const message = ref("");

onMounted(() => {
    setPanels();
    isInitialized.value = true;
});

watch(
    () => user.bookings,
    () => {
        setPanels();
    },
);

function setPanels() {
    const all = user.bookings || [];
    bookings.value = all;

    all.forEach((booking) => {
        const totalAmount = evalTotalAmount({
            startDate: booking.startDate,
            endDate: booking.endDate,
            startTime: booking.startTime,
            hourlyRate: booking.space.hourlyRate,
        });

        panels.value[booking._id] = panels.value[booking._id] || { isOpen: false, totalAmount };
        panels.value[booking._id].totalAmount = totalAmount;
    });
}

const filteredBookings = computed(() => {
    const q = props.searchQuery.trim().toLowerCase();
    const list = bookings.value || [];
    if (!q) return list;
    return list.filter((b) => (b.space?.name || "").toLowerCase().includes(q));
});

const bookingCount = computed(() => filteredBookings.value?.length ?? 0);

function cancelBooking(bookingId) {
    emit("bookings:action", {
        action: "cancelBooking",
        bookingId,
    });
}

function contactHost(creatorId) {
    emit("bookings:action", {
        action: "contactHost",
        creatorId,
        message: message.value,
    });
}

function browseSpaces() {
    router.push("/spaces");
}
</script>

<template>
    <div class="bookings-page" v-if="isInitialized">
        <div class="page-head">
            <div class="title">
                <h2>Your bookings</h2>
                <small class="subtitle">Manage your current, upcoming and past reservations</small>
            </div>
            <div class="meta">
                <Chip :label="`${bookingCount} total`" />
            </div>
        </div>

        <div v-if="bookingCount === 0" class="empty">
            <i class="pi pi-calendar-times empty__icon" aria-hidden="true"></i>
            <p class="empty__text">No bookings found.</p>
            <Button size="small" @click="browseSpaces">Browse spaces</Button>
        </div>

        <BookingLayout v-else :bookings="filteredBookings" :panels="panels">
            <template #contactHostButton>
                <Button
                    class="booking__panel-buttons-contact-host"
                    severity="secondary"
                    size="small"
                    @click="isMessageDialogVisible = true"
                >
                    <i class="pi pi-envelope"></i>
                    <span>Contact Host</span>
                </Button>
            </template>

            <template #cancelBookingButton="slotProps">
                <Button
                    class="booking__panel-buttons-cancel-booking"
                    severity="danger"
                    size="small"
                    @click="cancelBooking(slotProps.bookingId)"
                >
                    <i class="pi pi-times"></i>
                    <span>Cancel</span>
                </Button>
            </template>

            <template #messageDialog="slotProps">
                <Dialog
                    v-model:visible="isMessageDialogVisible"
                    modal
                    :pt="{
                        root: { style: 'width: 92%; max-width: 520px;' },
                    }"
                >
                    <template #header>
                        <div class="dialog__header">
                            <i class="pi pi-envelope"></i>
                            <span>Contact host</span>
                        </div>
                    </template>

                    <div class="dialog__main">
                        <FloatLabel variant="on">
                            <Textarea
                                v-model="message"
                                autoResize
                                rows="6"
                                maxlength="500"
                                placeholder="Write a short message to the host..."
                            />
                            <label>Message</label>
                        </FloatLabel>
                        <div class="char-counter">
                            <small>{{ message?.length || 0 }} / 500</small>
                        </div>
                    </div>

                    <template #footer>
                        <Button
                            class="message-dialog__cancel-button"
                            variant="text"
                            @click="isMessageDialogVisible = false"
                        >
                            Close
                        </Button>

                        <Button
                            class="message-dialog__send-button"
                            @click="contactHost(slotProps.creatorId)"
                            :disabled="!message || message.trim().length === 0"
                        >
                            <i class="pi pi-send"></i>
                            <span>Send</span>
                        </Button>
                    </template>
                </Dialog>
            </template>
        </BookingLayout>
    </div>
</template>

<style scoped>
.bookings-page {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}
.page-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 0.5rem;
    padding: 0.25rem 0.25rem 0.75rem 0.25rem;
}
.page-head .title {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
}
.page-head .title h2 {
    margin: 0;
    font-size: 1.35rem;
}
.page-head .subtitle {
    color: var(--p-surface-600);
}

.empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    border: 1px dashed var(--p-surface-300);
    background: var(--p-surface-0);
    border-radius: 12px;
    padding: 2rem 1rem;
    color: var(--p-surface-700);
}
.empty__icon {
    font-size: 1.6rem;
    color: var(--p-primary-600);
}

.dialog__header {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 600;
}
.dialog__main .p-textarea {
    width: 100%;
}
.char-counter {
    display: flex;
    justify-content: flex-end;
    margin-top: 0.25rem;
    color: var(--p-surface-600);
}
</style>
