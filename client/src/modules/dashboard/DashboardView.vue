<script setup>
import { onMounted } from "vue";
import { RouterView, useRouter } from "vue-router";
import useUserStore from "@/stores/useUserStore.js";

const { user } = useUserStore();
const router = useRouter();

onMounted(() => {
	if (user.role === "user") router.replace("/dashboard/user");
	if (user.role === "host") router.replace("/dashboard/host");
});
</script>

<template>
	<RouterView />
</template>

<style scoped></style>
