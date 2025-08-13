<script setup>
import { ref, onMounted, watch, computed } from "vue";
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

const { user } = useUserStore();
const panels = ref({});
const isInitialized = ref(false);
const upcomingBookings = ref([]);
const isMessageDialogVisible = ref(false);
const message = ref("");

onMounted(() => {
    setBookings();
    isInitialized.value = true;
});

watch(
    () => user.bookings,
    () => {
        setBookings();
    },
);

function setBookings() {
    const bookings = user.bookings || [];
    const now = new Date();
    upcomingBookings.value = bookings.filter((booking) => new Date(booking.startDate) > now);

    upcomingBookings.value.forEach((booking) => {
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
    const list = upcomingBookings.value || [];
    if (!q) return list;
    return list.filter((b) => (b.space?.name || "").toLowerCase().includes(q));
});

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
</script>

<template>
    <BookingLayout v-if="isInitialized" :bookings="filteredBookings" :panels="panels">
        <template #contactHostButton>
            <Button
                class="booking__panel-buttons-contact-host"
                severity="secondary"
                raised
                @click="isMessageDialogVisible = true"
            >
                Contact Host
            </Button>
        </template>

        <template #cancelBookingButton="slotProps">
            <Button
                class="booking__panel-buttons-cancel-booking"
                severity="danger"
                @click="cancelBooking(slotProps.bookingId)"
            >
                Cancel Booking
            </Button>
        </template>

        <template #messageDialog="slotProps">
            <Dialog
                v-model:visible="isMessageDialogVisible"
                modal
                :pt="{
                    root: {
                        style: 'width: 90%; max-width: 400px;',
                    },
                }"
            >
                <template #header>Contact Host</template>

                <div class="dialog__main">
                    <Textarea v-model="message" />
                </div>

                <template #footer>
                    <Button class="message-dialog__cancel-button" @click="isMessageDialogVisible = false">
                        Cancel
                    </Button>

                    <Button class="message-dialog__cancel-button" @click="contactHost(slotProps.creatorId)">
                        Send Message
                    </Button>
                </template>
            </Dialog>
        </template>
    </BookingLayout>
</template>

<style scoped>
.dialog__main .p-textarea {
    width: 100%;
    min-height: 200px;
}
</style>
