<script setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import AuthLayout from "../layouts/AuthLayout.vue";
import AuthForm from "../components/organisms/AuthForm.vue";
import signInAPI from "../api/signInAPI.js";
import useUserStore from "@/stores/useUserStore.js";

const router = useRouter();
const { setUser, user } = useUserStore();

const credentials = ref({
	nameOrEmail: "",
	password: "",
});

const errors = reactive({
	nameOrEmail: [],
	password: [],
});

const items = ref([
	{ id: "nameOrEmail", label: "Name or e-mail", type: "text" },
	{ id: "password", label: "Password", type: "password" },
]);

async function onFormAction(event) {
	// send input to server
	if(event.action === "submit"){
		// abort if errors remaining
		const error = Object.keys(errors).find(key => errors[key].length > 0);
		if(error) return;

		// validate user input
		if(!validateInputs()) return;

		// send input to server
		const result = await signInAPI({
			nameOrEmail: credentials.value.nameOrEmail,
			password: credentials.value.password,
		});

		setUser(result.data.user);
		localStorage.setItem("jwt", user.jwt);
		localStorage.setItem("isSignedIn", true);

		router.push("/dashboard");
	}

	// remove error
	if(event.action === "removeErrors"){
		removeErrors(event.inputId);
	}
}

function validateInputs(){
	let success = true;

	if(credentials.value.nameOrEmail === ""){
		errors.nameOrEmail.push("Please enter name or e-mail.");
		success = false;
	}
	if(credentials.value.password === ""){
		errors.password.push("Please enter a password.");
		success = false;
	}

	return success;
}

function removeErrors(inputId){
	errors[inputId] = [];
}

</script>

<template>
	<AuthLayout>
		<template #header>
			Sign in
		</template>

		<template #mainContent>
			<AuthForm
				v-model="credentials"
				:items="items"
				:errors="errors"
				@authForm:action="onFormAction"
			/>
		</template>
	</AuthLayout>
</template>
