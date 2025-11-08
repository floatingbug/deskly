<script setup>
import {ref, onMounted, toRaw, watch} from "vue";
import MainLayout from "@/layouts/MainLayout.vue";
import ConversationList from "./components/organisms/ConversationList.vue";
import ChatWindow from "./components/organisms/ChatWindow.vue";
import getConversations from "./services/getConversations.js";
import apiFetch from "@/api/apiFetch.js";
import useUserStore from "@/stores/useUserStore.js";
import useDevice from "@/composables/useDevice.js";


const {user} = useUserStore();
const {device} = useDevice();
const conversations = ref(null);
const isInitialized = ref(false);
const messages = ref([]);
const isSidebarClosed = ref(false);
let currConversation = null;


onMounted(async () => {
	const result = await getConversations();
	conversations.value = result.data;
	
	if(device.size >= 1024) isSidebarClosed.value = true;

	isInitialized.value = true;
});


watch(() => device.size, () => {
	if(device.size >= 1024) isSidebarClosed.value = true;
});


async function onConversationListActions(event){
	if(event.action === "openConversation"){
		messages.value = await getMessages({conversationId: event.conversationId});
		currConversation = getCurrConversation({conversationId: event.conversationId});

		// map name to messages
		mapNameToMessages();

		// set unreadCount to 0
		conversations.value.find(c => c._id === event.conversationId)
			.participants.find(p => p.participantId === user._id)
			.unreadCount = 0;

		isSidebarClosed.value = true;
	}
	else if(event.action === "closeConversationList") isSidebarClosed.value = true;
}

async function onChatWindowActions(event){
	if(event.action === "newMessage"){
		const result = await sendMessage({
			message: event.message,
			conversationId: currConversation._id,
		});

		messages.value = await getMessages({conversationId: currConversation._id});

		mapNameToMessages();
	}
}

async function getMessages({conversationId}){
	const path = `/inbox/get-messages?conversationId=${conversationId}`;
	const options = {
		method: "GET",
		headers: {},
	};

	const result = await apiFetch({
		path,
		options,
		addJwt: true,
	});

	return result.data;
}

async function sendMessage({message, conversationId}){
	const path = "/inbox/add-message";
	const options = {
		method: "POST",
		headers: {
			"content-type": "application/json",
		},
		body: JSON.stringify({
			message,
			conversationId,
		}),
	};

	const result = await apiFetch({
		path,
		options,
		addJwt: true,
	});

	return result;
}

function getCurrConversation({conversationId}){
	const currConversation = conversations.value.find(conversation => conversation._id === conversationId);


	return toRaw(currConversation);
}

function mapNameToMessages(){
	messages.value.forEach(m => {
		currConversation.chatPartners.forEach(p => {
			if(m.messageCreator === user._id){
				m.messageCreatorName = user.name;
			}
			else if(m.messageCreator === p._id){
				m.messageCreatorName = p.name;
			}
		});
	});
}

</script>


<template>
	<MainLayout>
		<template #mainContent>
			<div class="inbox"
				v-if="isInitialized"
			>
				<div class="content">
					<Button class="conversation-list-toggle-button"
						v-if="isSidebarClosed"
						@click="isSidebarClosed = false"
					>
						<i class="pi pi-comments" />
					</Button>

					<div class="inbox__sidebar"
						:class="isSidebarClosed ? 'inbox__sidebar--closed' : ''"
					>
						<ConversationList 
							:conversations="conversations" 
							@conversationList:action="onConversationListActions"
						/>
					</div>
					
					<div class="inbox__chat"
						v-if="messages.length > 0"
					>
						<ChatWindow 
							:messages="messages"
							@chatWindow:action="onChatWindowActions"
						/>
					</div>
				</div>
			</div>
		</template>
	</MainLayout>
</template>


<style scoped>
.inbox {
	display: flex;
	flex-direction: column;
}

.content {
	width: 100%;
	height: 80dvh;
	position: relative;
	display: flex;
	gap: var(--spacing-md);
	overflow: hidden;
}

.inbox__sidebar {
	width: 100%;
	height: 100%;
	position: absolute;
	left: 0;
	top: 0;
	display: flex;
	flex-direction: column;
	transition: transform 250ms;
	z-index: 10;
}

.inbox__sidebar--closed {
	transform: translateX(-100%);
}

.inbox__chat {
	width: 100%;
}

@media(min-width: 1024px) {
	.inbox__sidebar--closed {
		width: 200px;
		position: static;
		transform: translateX(0);
	}

	.conversation-list-toggle-button {
		display: none;
	}
}
</style>
