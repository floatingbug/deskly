<script setup>
import {ref} from "vue";
import Menu from "primevue/menu";


const items = ref([
    {
        label: "Dashboard",
        id: "dashboard",
        isActive: false,
        path: "/dashboard/host",
        icon: "pi pi-th-large",
    },
    {
        label: "Add Space",
        id: "addSpace",
        isActive: false,
        path: "/add-space",
        icon: "pi pi-plus",
    },
    {
        label: "Inbox",
        id: "inbox",
        isActive: false,
        path: "/inbox",
        icon: "pi pi-envelope",
    },
]);

</script>


<template>    
    <aside>
        <Menu
            :model="items"
        >
            <template #item="{item, props}">
                <router-link class="item"
                    v-bind="props.action"
                    :to="item.path"
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

.item {
    font-size: var(--font-size-sm);
}

.item-icon {
    font-size: var(--font-size-sm);
}
</style>
