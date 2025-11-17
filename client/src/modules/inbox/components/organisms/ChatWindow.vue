<script setup>
import {ref, watch, nextTick} from "vue";
import MessageBubble from "../atoms/MessageBubble.vue";
import MessageInput from "../molecules/MessageInput.vue";
import useUserStore from "@/stores/useUserStore.js";


const props = defineProps({
	messages: {
		type: Array,
		required: true,
	}
});


const emit = defineEmits(["chatWindow:action"]);


const {user} = useUserStore();
const messagesContainer = ref(null);


async function scrollToBottom(){
	await nextTick();
	const container = messagesContainer.value;
	if (container) {
		container.scrollTop = container.scrollHeight;
	}
	requestAnimationFrame(() => {
		container.scrollTop = container.scrollHeight;
	});
};


watch(
	() => props.messages.length,
	() => {
		scrollToBottom();
	}
);


function onMessageInputActions(event){
	if(event.action === "newMessage"){
		emit("chatWindow:action", {
			...event,
		});
	}
}

</script>


<template>
	<div class="chat-window">
		<div class="messages-container"
			ref="messagesContainer"
		>
			<MessageBubble
				v-for="(message, index) in messages"
				:key="index"
				:message="message"
				class="message-bubble"
				:class="message.messageCreatorName === user.name ? 'user-message-bubble' : ''"
			/>
		</div>

		<div class="message-input-container">
			<MessageInput
				@messageInput:action="onMessageInputActions"
			/>
		</div>
	</div>
</template>


<style scoped>
.chat-window {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	gap: var(--spacing-md);
	border-radius: var(--radius-md);
	border: 1px solid var(--border-color-neutral);
	padding: var(--spacing-md);
	z-index: 1;
}

.messages-container {
	height: 70%;
	display: flex;
	flex-direction: column;
	gap: var(--spacing-md);
	overflow-y: auto;
	scroll-behavior: smooth;
}

.message-bubble {
	width: 90%;
}

.message-input-container {
	height: 30%;
	z-index: 2;
	background-color: var(--bg-surface-light);
}

.user-message-bubble {
	margin-left: auto;
}
</style>
