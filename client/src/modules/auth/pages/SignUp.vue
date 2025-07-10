<script setup>
import {ref, reactive, watch} from "vue";
import {useRouter} from "vue-router";
import AuthLayout from "../layouts/AuthLayout.vue";
import signUpAPI from "../api/signUpAPI.js";


const router = useRouter();
const credentials = reactive({
	name: "",
	email: "",
	password: "",
});
const errors = ref([]);


watch(() => credentials, () => {
	errors.value = [];
}, {deep: true});


async function onSignUpButtonClick(){
	const result = await signUpAPI(credentials);

	if(!result.success){
		errors.value = result.errors;
		return;
	}

	router.push("/auth/sign-in");
}

</script>


<template>    
	<AuthLayout :errors="errors">
		<template #header>
			Sign up
		</template>

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

		<template #submit>
			<Button
				@click="onSignUpButtonClick"
			>
				Sign up
			</Button>
		</template>
	</AuthLayout>
</template>   


<style scoped>
</style>
