<script setup>
import { ref, onMounted, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import useUserStore from "@/stores/useUserStore.js";
import useDevice from "@/composables/useDevice.js";
import UserMenu from "./components/UserMenu.vue";
import SigneOutMenu from "./components/SigneOutMenu.vue";
import HostMenu from "./components/HostMenu.vue";


const { device } = useDevice();
const { user, unsetUser } = useUserStore();


onMounted(() => {
});


</script>

<template>
    <!-- Navbar for signed out users -->
    <SigneOutMenu v-if="!user.isSignedIn" />

    <!-- Navbar for user-role: user -->
    <UserMenu v-if="user.role === 'user'" />


    <!-- Navbar for user-role: host -->
    <HostMenu v-if="user.role === 'host'" />
</template>

<style scoped>
</style>
