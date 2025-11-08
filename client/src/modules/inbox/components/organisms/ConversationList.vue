<script setup>
import ConversationItem from "../molecules/ConversationItem.vue";
import useDevice from "@/composables/useDevice.js";


const props = defineProps({
	conversations: {
		type: Array,
		required: true,
	}
});


const emit = defineEmits(["conversationList:action"]);


const {device} = useDevice();


function openConversation(event){
	emit("conversationList:action", {
		...event,
	});
}

function closeConversationList(){
	emit("conversationList:action", {
		action: "closeConversationList",
	});
}

</script>


<template>
	<div class="conversation-list">
		<header>
			<Button class="button-close-sidebar"
				v-if="device.size < 1024"
				severity="secondary"
				outlined
				raised
				@click="closeConversationList"
			>
				close
			</Button>
		</header>

		<div class="conversation-items">
			<ConversationItem 
				v-for="(conversation, index) in conversations"
				:key="index"
				:conversation="conversation"
				@conversationItem:action="openConversation"
			/>
		</div>
	</div>
</template>


<style scoped>
.conversation-list {
	width: 100%;
	height: 100%;
	padding: var(--spacing-md);
	border-radius: var(--radius-md);
	border: 1px solid var(--border-color-neutral);
	background-color: hsl(from var(--bg-surface-light) h s l / 50%);
	backdrop-filter: blur(8px);
}

.conversation-items {
	width: 100%;
	display: flex;
	flex-direction: column;
	margin-top: var(--spacing-md);
}

header {
	display: flex;
	justify-content: flex-end;
}
</style>
