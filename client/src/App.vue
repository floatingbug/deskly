<script setup>
import { ref, onMounted } from "vue";
import { RouterLink, RouterView, useRouter } from "vue-router";
import useUserStore from "@/stores/useUserStore.js";
import fetchUserByJwtAPI from "@/api/fetchUserByJwtAPI.js";
import Toast from "primevue/toast";

const { setUser, user } = useUserStore();
const router = useRouter();
const isInitialized = ref(false);

onMounted(async () => {
    if (localStorage.getItem("isSignedIn")) {
        const fetchedUser = await fetchUserByJwtAPI({
            jwt: localStorage.getItem("jwt"),
        });

        setUser(fetchedUser.data.user);

        if (user.role === "user") router.push("/dashboard/user");
        else router.push("/dashboard/host");
    } else {
        router.push("/");
    }

    isInitialized.value = true;
});
</script>

<template>
    <Toast />
    
    <RouterView />
</template>

<style>

.p-toast {
    z-index: 5000 !important;
}
</style>
