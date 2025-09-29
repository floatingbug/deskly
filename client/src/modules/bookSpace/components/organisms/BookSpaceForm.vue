<script setup>
import { ref, reactive, watch, onMounted } from "vue";
import getDisabledDates from "../../utils/getDisabledDates.js";


const props = defineProps({
    space: Object,
    bookings: Array,
});


const emit = defineEmits(["bookSpaceForm:action"]);


const selectedDate = ref();
const disabledDates = ref([]);
const specialRequest = ref("");
const bookingStatus = reactive({
    totalHours: 0,
    totalAmount: 0,
});


onMounted(() => {
    // set disabled dates
    props.bookings.forEach((booking) => {
        const dates = getDisabledDates(booking.startDate, booking.endDate);
        disabledDates.value.push(...dates);
    });
});


// set bookingStatus
watch(() => selectedDate.value, () => {
    // set totalHours
    if(selectedDate.value[0] && selectedDate.value[1]){
        const totalMilliseconds = selectedDate.value[1].getTime() - selectedDate.value[0].getTime();
        bookingStatus.totalHours = Math.floor(totalMilliseconds / (1000 * 60 * 60));
    }

    // set totalAmount
    bookingStatus.totalAmount = bookingStatus.totalHours * props.space.hourlyRate;
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
            totalHours: bookingStatus.totalHours,
            totalAmount: bookingStatus.totalAmount,
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

        <div class="booking-status__container">
            <h2>Summarized Booking</h2>

            <div class="booking-status">
                <div class="booking-status__item">
                    <div class="booking-status__item-label">
                        Total Hours:
                    </div>
                
                    <div class="booking-status__item-value">
                        {{bookingStatus.totalHours}}
                    </div>
                </div>
                
                <div class="booking-status__item">
                    <div class="booking-status__item-label">
                        Total Amount:
                    </div>
                
                    <div class="booking-status__item-value">
                        {{bookingStatus.totalAmount}}$
                    </div>
                </div>
            </div>
        </div>

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

.booking-status__container {
    display: flex;
    flex-direction: column;
}

.booking-status {
    display: flex;
    gap: var(--spacing-md);
}

.booking-status__item {
    display: flex;
    gap: var(--spacing-sm);
}
</style>
