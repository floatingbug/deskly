<script setup>
import { ref, reactive, watch } from "vue";
import { useRouter } from "vue-router";
import AuthLayout from "../layouts/AuthLayout.vue";
import signInAPI from "../api/signInAPI.js";
import useUserStore from "@/stores/useUserStore.js";

const router = useRouter();
const { setUser, user } = useUserStore();
const credentials = reactive({
    nameOrEmail: "",
    password: "",
});
const errors = ref([]);

watch(
    () => credentials,
    () => {
        errors.value = [];
    },
    { deep: true },
);

async function onSignInButtonClick() {
    const result = await signInAPI(credentials);

    if (!result.success) {
        errors.value = result.errors;
        return;
    }

    setUser(result.data.user);
    localStorage.setItem("jwt", user.jwt);
    localStorage.setItem("isSignedIn", true);

    router.push("/dashboard");
}
</script>

<template>
    <AuthLayout :errors="errors">
        <template #header>Sign in</template>

        <template #nameOrEmail>
            <InputGroup>
                <InputGroupAddon>
                    <i class="pi pi-user"></i>
                </InputGroupAddon>

                <FloatLabel>
                    <InputText v-model="credentials.nameOrEmail"></InputText>
                    <label for="nameOrEmail">Name or E-Mail</label>
                </FloatLabel>
            </InputGroup>
        </template>

        <template #password>
            <InputGroup>
                <InputGroupAddon>
                    <i class="pi pi-lock"></i>
                </InputGroupAddon>

                <FloatLabel>
                    <InputText type="password" v-model="credentials.password"></InputText>
                    <label for="password">Password</label>
                </FloatLabel>
            </InputGroup>
        </template>

        <template #submit>
            <Button @click="onSignInButtonClick">Sign in</Button>
        </template>
    </AuthLayout>
</template>

<style scoped></style>
