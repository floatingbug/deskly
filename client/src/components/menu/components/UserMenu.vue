<script setup>
import {ref} from "vue";
import Menu from "primevue/menu";
import useStateStore from "@/stores/useStateStore.js";


const {state} = useStateStore();


const items = ref([
    {
        label: "Dashboard",
        id: "dashboard",
        isActive: false,
        path: "/dashboard/user",
        icon: "pi pi-th-large",
    },
    {
        label: "Find Spaces",
        id: "addSpace",
        isActive: false,
        path: "/spaces",
        icon: "pi pi-search",
    },
    {
        label: "Inbox",
        id: "inbox",
        isActive: false,
        path: "/inbox",
        icon: "pi pi-inbox",
    },
]);

</script>


<template>    
    <aside>
        <Menu
            :model="items"
			:pt="{
				root: {
					class: 'menu'
				}
			}"
        >
            <template #item="{item, props}">
                <router-link class="item"
                    v-bind="props.action"
                    :to="item.path"
                    @click="state.isSideMenuOpen = false;"
                >
                    <span class="item-icon"
                        :class="item.icon"
                    >
                    </span>
                    <span>{{item.label}}</span>
                </router-link>
            </template>
        </Menu>
    </aside>
</template>   


<style scoped>
aside {
    width: 100%;
    height: 100%;
    display: flex;
}

:deep(.menu) {
	background-color: var(--card-bg);
}

.item {
    font-size: var(--font-size-sm);
}

.item-icon {
    font-size: var(--font-size-sm);
}
</style>
