<script setup>
const props = defineProps({
	errors: Array,
});
</script>


<template>    
	<div class="layout">
		<h1>
			<slot name="header"></slot>
		</h1>
		
		<div class="auth__form">
			<slot name="nameOrEmail">
			</slot>
			
			<slot name="name">
			</slot>
			
			<slot name="email">
			</slot>
			
			<slot name="password">
			</slot>

			<ul class="errors" v-if="errors.length > 0">
				<li
					v-for="(error, index) in errors"
					:key="index"
				>
					{{error}}
				</li>
			</ul>

			<div class="submit">
				<slot name="submit"></slot>
			</div>
		</div>
	</div>
</template>   


<style scoped>
.auth__form {
	display: flex;
	flex-direction: column;
	gap: 2rem;
	margin-top: 2rem;
}

.submit {
	width: 100%;
	display: flex;
	justify-content: flex-end;
}

.errors {
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	list-style: disc;
	padding-left: 1rem;
}
</style>
