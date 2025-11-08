<script setup>
import {ref} from "vue";


const emit = defineEmits(["contactHostDialog:action"]);


const message = ref("");


// close dialog
function closeDialog(){
	emit("contactHostDialog:action", {
		action: "closeDialog",
	});

	message.value = "";
}

// tell parent to send the message
function sendMessage(){
	emit("contactHostDialog:action", {
		action: "sendMessage",
		message: message.value,
	});

	closeDialog();
}

</script>


<template>
	<Dialog
		visible="visible"
		modal
		header="Contact host"
		@update:visible="closeDialog"
	>
		<div class="dialog-container">
			<Textarea v-model="message" />

			<div class="buttons">
				<Button
					severity="secondary"
					raised
					@click="closeDialog"
				>
					Cancel
				</Button>

				<Button
					@click="sendMessage"
				>
					Send Message
				</Button>
			</div>
		</div>
	</Dialog>
</template>


<style scoped>
.dialog-container {
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	gap: calc(var(--spacing-lg) * 2);
}

.p-textarea {
	min-width: 300px;
	min-height: 200px;
}

.buttons {
	display: flex;
	gap: var(--spacing-md);
}
</style>
