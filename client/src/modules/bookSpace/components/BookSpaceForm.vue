<script setup>
import { ref, onMounted } from "vue";
import getDisabledDates from "../utils/getDisabledDates.js";

const props = defineProps({
    space: Object,
    bookings: Array,
});

const emit = defineEmits(["bookSpaceForm:action"]);

const selectedDate = ref();
const disabledDates = ref([]);
const specialRequest = ref("");

onMounted(() => {
    // set disabled dates
    props.bookings.forEach((booking) => {
        const dates = getDisabledDates(booking.startDate, booking.endDate);
        disabledDates.value.push(...dates);
    });
});

function onBookButtonClick() {
    const startDate = selectedDate.value[0].toISOString().split("T")[0];
    const endDate = selectedDate.value[1].toISOString().split("T")[0];
    const hours = selectedDate.value[1].getUTCHours().toString().padStart(2, "0");
    const minutes = selectedDate.value[1].getUTCMinutes().toString().padStart(2, "0");
    const startTime = `${hours}:${minutes}`;

    emit("bookSpaceForm:action", {
        action: "newBooking",
        booking: {
            spaceId: props.space._id,
            startDate,
            endDate,
            startTime,
            specialRequest: specialRequest.value,
        },
    });
}
</script>

<template>
    <div class="book-space-form">
        <DatePicker
            v-model="selectedDate"
            :disabledDates="disabledDates"
            dateFormat="dd.mm.yy"
            selectionMode="range"
            :manualInput="false"
            inline
            :showTime="selectedDate?.length === 2"
            hourFormat="12"
        />

        <InputGroup>
            <InputGroupAddon>
                <i class="pi pi-comment"></i>
            </InputGroupAddon>

            <FloatLabel>
                <Textarea v-model="specialRequest"></Textarea>
                <label for="special-requests">Special Requests</label>
            </FloatLabel>
        </InputGroup>

        <Button @click="onBookButtonClick">
            <i class="pi pi-check"></i>
            Book
        </Button>
    </div>
</template>

<style scoped>
.book-space-form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
}

.p-textarea {
    width: 100%;
}
</style>
