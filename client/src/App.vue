<script setup>
import { ref, onMounted } from "vue";
import { RouterLink, RouterView, useRouter } from "vue-router";
import useUserStore from "@/stores/useUserStore.js";
import useStateStore from "@/stores/useStateStore.js";
import fetchUserByJwtAPI from "@/api/fetchUserByJwtAPI.js";
import Toast from "primevue/toast";
import ProgressSpinner from 'primevue/progressspinner';


const { setUser, user } = useUserStore();
const {state} = useStateStore();
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
	<div class="progress-spinner-wrapper"
		v-if="state.isLoading"
	>
		<ProgressSpinner />
	</div>
    
    <RouterView />
</template>


<style>
.progress-spinner-wrapper {
	width: 100%;
	height: 100dvh;
	position: fixed;
	display: flex;
	justify-content: center;
	align-items: center;
    z-index: 5000 !important;
	backdrop-filter: blur(8px);
	background-color: hsl(from var(--bg-surface) h s l / 50%);
}

.p-toast {
    z-index: 5000 !important;
}
</style>
