<script setup>
import {ref, onMounted, watch} from "vue";
import useUserStore from "@/stores/useUserStore.js";


const props = defineProps({
	conversation: {
		type: Object,
		required: true,
	}
});


const emit = defineEmits(["conversationItem:action"]);


const {user} = useUserStore();
const unreadMessages = ref();
const isInitialized = ref(false);


onMounted(() => {
	unreadMessages.value = props.conversation.participants.find(p => p.participantId === user._id).unreadCount;

	isInitialized.value = true;
});


watch(props.conversation, () => {
	unreadMessages.value = props.conversation.participants.find(p => p.participantId === user._id).unreadCount;
});


function openConversation(){
	emit("conversationItem:action", {
		action: "openConversation",
		conversationId: props.conversation._id,
	});
}

</script>


<template>
	<div class="chat-partners"
		v-if="isInitialized"
		@click="openConversation"
	>

		<Badge class="badge-unread-messages"
			v-if="unreadMessages != 0"
			:value="unreadMessages"
		>
		</Badge>

		<div class="partner"
			v-for="(partner, index) in conversation.chatPartners"
			:key="index"
		>
			<span>{{partner.name}}</span>
		</div>
	</div>
</template>


<style scoped>
.chat-partners {
	width: 100%;
	position: relative;
	padding: var(--spacing-sm) var(--spacing-md);
	user-select: none;
	cursor: pointer;
	border-radius: var(--radius-md);
	border: 1px solid var(--border-color-secondary);
	box-shadow: 1px 1px 0 1px var(--bg-secondary);
	background-color: var(--bg-secondary-light);
}

.chat-partners:hover {
	color: var(--color-text-contrast);
	background-color: var(--bg-primary);
}

.badge-unread-messages {
	position: absolute;
	right: -8px;
	top: -8px;
}
</style>
