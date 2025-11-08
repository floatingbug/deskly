<script setup>
import {ref, reactive} from "vue";
import { useRouter } from "vue-router";
import AuthLayout from "../layouts/AuthLayout.vue";
import signUpAPI from "../api/signUpAPI.js";
import AuthForm from "../components/organisms/AuthForm.vue";


const router = useRouter();

const credentials = ref({
	name: "",
	email: "",
	role: "",
	password: "",
});

const items = ref([
	{
		id: "name",
		label: "Name",
		type: "text",
	},
	{
		id: "email",
		label: "E-Mail",
		type: "email",
	},
	{
		id: "password",
		label: "Password",
		type: "password",
	},
	{
		id: "role",
		label: "Role",
		type: "select",
		options: [
			{
				name: "User",
				id: "user",
			},
			{
				name: "Host",
				id: "host",
			},
		],
	}
]);

const errors = reactive({
	name: [],
	email: [],
	password: [],
	role: [],
});


async function onAuthFormActions(event) {
	if(event.action === "submit"){
		// if errors are remaining return
		const error = Object.keys(errors).find(key => errors[key].length > 0);
		if(error) return;

		// validate user inputs
		if(!validateInputs()) return;

		// send credentials to server
		const result = await signUpAPI({
			name: credentials.value.name,
			email: credentials.value.email,
			password: credentials.value.password,
			role: credentials.value.role,
		});

		router.push("/auth/sign-in");
	}

	// remove errors
	if(event.action === "removeErrors"){
		removeErrors(event.inputId);
	}
}

function validateInputs(){
	let success = true;

	// validate required inputs
	if(!credentials.value.name){
		errors.name.push("Please enter a name."); 
		success = false;
	}
	if(credentials.value.name && credentials.value.name.length < 3){
		errors.name.push("Name must have at least 3 characters.");
	}

	if(!credentials.value.email){
		errors.email.push("Please enter an e-mail address."); 
		success = false;
	}
	if(!credentials.value.password){
		errors.password.push("Please enter a password."); 
		success = false;
	}
	if(!credentials.value.role){
		errors.role.push("Please select a role."); 
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
			Sign up
		</template>

		<template #mainContent>
			<AuthForm 
				v-model="credentials"
				:items="items"
				:errors="errors"
				@authForm:action="onAuthFormActions"
			/>
		</template>
	</AuthLayout>
</template>

<style scoped>
</style>
