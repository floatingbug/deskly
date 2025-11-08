<script setup>
import {ref} from "vue";


const emit = defineEmits(["messageInput:action"]);


const message = ref("");


function sendMessage(){
	emit("messageInput:action", {
		action: "newMessage",
		message: message.value,
	});

	message.value = "";
}

</script>


<template>
	<div class="message-input">
		<Textarea
			autoresize
			v-model="message"
		/>

		<div class="button-send-message">
			<Button
				@click="sendMessage"
			>
				Send message
			</Button>
		</div>
	</div>
</template>


<style scoped>
.message-input {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	gap: var(--spacing-md);
}

.p-textarea {
	width: 100%;
	height: 100%;
	resize: none;
}

.button-send-message {
	margin-top: auto;
}
</style>
