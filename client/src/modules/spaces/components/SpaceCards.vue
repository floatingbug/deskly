<script setup>
import {ref, onMounted} from "vue";
import {useRouter} from "vue-router";
import useSpacesStore from "@/stores/useSpacesStore.js";
import useUserStore from "@/stores/useUserStore.js";


const router = useRouter();
const {user} = useUserStore();
const {spacesStoreSpaces} = useSpacesStore();
const showDialog = ref(false);
const createdAt = ref();


function onCardClick(space){
	if(!user.isSignedIn){
		showDialog.value = true;
	}
	else{
		router.push(`/book-space?spaceId=${space._id}`)
	}
}

function formatDate(zDate){
	return new Date(zDate).toLocaleDateString();
}

</script>


<template>
	<Dialog v-model:visible="showDialog" header="Not signed in" modal>
		<div class="space-card__dialog">
			<div class="space-card__dialog-text">
				<p>
					To book a working space you need to be signed in.
				</p>
			</div>

			<div class="space-card__dialog-buttons">
				<Button
					severity="secondary"
					@click="router.push('/auth/sign-in')"
				>
					Sign in
				</Button>
				<Button
					@click="router.push('/auth/sign-up')"
				>
					Sign up
				</Button>
			</div>
		</div>
	</Dialog>

	<div 
		class="space-card"
		v-for="(space, index) in spacesStoreSpaces"
		:key="index"
		@click="onCardClick(space)"
	>
		<div class="space-card__head">
			<div class="space-card__head-top">
				<h2 class="space-card__head-name">
					{{space.name}}
				</h2>
				
				<div class="space-card__head-description">
					{{space.description}}
				</div>
			</div>
			
			<div class="space-card__head-location">
				<span>Location: </span> {{space.location}}
			</div>
		</div>

		<div class="space-card__main">
			<div class="space-card__main-left">
				<h3 class="space-card__main-amenities-head">Amenities</h3>
				
				<ul class="space-card__main-amenities">
				
					<li
						class="amenitie"
						v-for="(amenitie, index) in space.amenities"
					>
						{{amenitie.label}}
					</li>
				</ul>
			</div>

			<div class="space-card__main-right">
				<div class="space-card__main-capacity">
					<span>Capacity: </span> {{space.capacity}}
				</div>
				
				<div class="space-card__main-hourly-rate">
					<span>Hourly rate: </span> {{space.hourlyRate}}
				</div>
			</div>
		</div>

		<div class="space-card__footer">
			<div class="space-card__footer-created-at">
				<span>Created at:</span> {{formatDate(space.createdAt)}}
			</div>
		</div>
	</div>
</template>


<style scoped>
.space-card__dialog-buttons {
	width: 100%;
	display: flex;
	justify-content: flex-end;
	gap: 1rem;
	margin-top: 3rem;
}

.space-card {
	width: 100%;
	max-width: 350px;
	height: 400px;
	display: flex;
	flex-direction: column;
	border-radius: 8px;
	cursor: pointer;
	border: 1px solid var(--space-card-border-color);
	background-color: var(--space-card-bg-color);
	overflow: hidden;
}

.space-card:hover {
	  box-shadow: 0 0 0 2px var(--p-primary-500);
}

.space-card__head {
	height: 50%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	overflow-y: scroll;
	background-color: var(--space-card-head-bg-color);
}

.space-card__head-name {
	padding: 1rem 1rem 0 1rem;
	margin: 0;
}

.space-card__head-description {
	padding: 1rem;
}

.space-card__head-location {
	padding: 0 1rem;
	margin-bottom: 1rem;
}

.space-card__main {
	height: 30%;
	display: flex;
	overflow-y: scroll;
	margin-top: 2rem;
}

.space-card__main-left {
	width: 50%;
	padding-left: 1rem;
}

.space-card__main-amenities {
	list-style: disc;
	padding: 0 1rem;
	margin: 0;
}

.space-card__main-amenities-head {
	margin: 0 0 0.5rem 0;
}

.space-card__main-capacity {
	margin-top: 1rem;
}

.space-card__main-hourly-rate{
	margin-top: 0.2rem;
}

.space-card__footer {
	margin-top: auto;
	padding: 1rem;
	border-top: 1px solid var(--space-card-border-color);
}
</style>
