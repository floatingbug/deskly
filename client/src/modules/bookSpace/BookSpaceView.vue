<script setup>
import {ref, reactive, onMounted} from "vue";
import {useRoute} from "vue-router";
import fetchSpaceById from "./api/fetchSpaceById.js";
import SpaceInformations from "./components/SpaceInformations.vue";
import BookSpaceForm from "./components/BookSpaceForm.vue";


const route = useRoute();
const space = ref();


onMounted(async () => {
	const result = await fetchSpaceById({spaceId: route.query.spaceId});

	space.value = result.data;

	console.log(space.value);
});

</script>


<template>
	<div v-if="space" class="layout">
		<h1>Book</h1>

		<SpaceInformations class="space-informations" :space="space" />

		<div class="book-space-form">
			<h2 class="book-space-form__header">
				Book Space
			</h2>

			<BookSpaceForm />
		</div>
	</div>
</template>


<style scoped>
.space-informations {
	width: 90%;
}

.book-space-form__header {
	margin-top: 2rem;
}
</style>
