<script setup>
import { ref, reactive, watch } from "vue";
import { useRouter } from "vue-router";
import AuthLayout from "../layouts/AuthLayout.vue";
import signUpAPI from "../api/signUpAPI.js";
import Select from "primevue/select";

const router = useRouter();
const credentials = reactive({
	name: "",
	email: "",
	role: "user",
	password: "",
});
const errors = ref([]);
const roleOptions = ref([
	{
		label: "User",
		value: "user",
	},
	{
		label: "Host",
		value: "host",
	},
]);

watch(
	() => credentials,
	() => {
		errors.value = [];
	},
	{ deep: true },
);

async function onSignUpButtonClick() {
	const result = await signUpAPI(credentials);

	if (!result.success) {
		errors.value = result.errors;
		return;
	}

	router.push("/auth/sign-in");
}

async function onSelectButtonChange(event) {
	console.log(event);
}
</script>

<template>
	<AuthLayout :errors="errors">
		<template #header>Sign up</template>

		<template #name>
			<InputGroup>
				<InputGroupAddon>
					<i class="pi pi-user"></i>
				</InputGroupAddon>

				<FloatLabel>
					<InputText v-model="credentials.name"></InputText>
					<label for="name">Name</label>
				</FloatLabel>
			</InputGroup>
		</template>

		<template #email>
			<InputGroup>
				<InputGroupAddon>
					<i class="pi pi-envelope"></i>
				</InputGroupAddon>

				<FloatLabel>
					<InputText type="email" v-model="credentials.email"></InputText>
					<label for="name">E-Mail</label>
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

		<template #selectButton>
			<div class="role-select">
				<span>Select Your Role</span>
				<Select
					v-model="credentials.role"
					:options="roleOptions"
					optionLabel="label"
					optionValue="value"
					@update:modelValue="onSelectButtonChange"
				/>
			</div>
		</template>

		<template #submit>
			<Button @click="onSignUpButtonClick">Sign up</Button>
		</template>
	</AuthLayout>
</template>

<style scoped>
.role-select {
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
}
</style>
