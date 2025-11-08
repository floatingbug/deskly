<script setup>
import { ref } from "vue";
import Menu from "primevue/menu";
import useStateStore from "@/stores/useStateStore.js";


const props = defineProps({
	items: Array,
});


const { state } = useStateStore();


</script>


<template>
	<aside>
		<Menu
			:model="items"
			:pt="{
				root: {
					style: 'width: 100%;'
				}
			}"
		>
			<template #item="{ item, props }">
				<router-link class="item" 
					v-bind="props.action" 
					:to="item.path"
					@click="state.isSideMenuOpen = false;"
				>
					<span class="item-icon" :class="item.icon"></span>
					<span>{{ item.label }}</span>
				</router-link>
			</template>
		</Menu>
	</aside>
</template>


<style scoped>
aside {
	height: 100%;
	display: flex;
	border-radius: var(--radius-md);
}

:deel(.menu) {
	width: 100% !important;
}

.item {
	font-size: var(--font-size-sm);
}

.item-icon {
	font-size: var(--font-size-sm);
}
</style>
