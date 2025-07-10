<script setup>
import {ref} from "vue";
import {useRouter} from "vue-router";
import useUserStore from "@/stores/useUserStore.js";
import useDevice from "@/composables/useDevice.js";


const {device} = useDevice();
const {user, unsetUser} = useUserStore();
const router = useRouter();
const isActionsClosed = ref(true);
const actionButtonsRoleUser = ref([
	{
		label: "Home",
		id: "home",
		isActive: false,
		path : "/"
	},
	{
		label: "Spaces",
		id: "spaces",
		isActive: false,
		path : "/spaces"
	},
	{
		label: "My Bookings",
		id: "myBookings",
		isActive: false,
		path : "/my-bookings"
	},
	{
		label: "Contact",
		id: "contact",
		isActive: false,
		path : "/contact"
	},
]);

const actionButtonsSignedOutUser = ref([
	{
		label: "Home",
		id: "home",
		isActive: false,
		path : "/"
	},
	{
		label: "Spaces",
		id: "spaces",
		isActive: false,
		path : "/spaces"
	},
	{
		label: "Contact",
		id: "contact",
		isActive: false,
		path : "/contact"
	},
]);


function onActionButtonClicked({id, path, buttons}){
	buttons.forEach(button => button.isActive = false);
	buttons.find(button => button.id === id).isActive = true;

	router.push(path);
}


function closeActions(event){
	if(event.target.attributes.type && event.target.attributes.type.value === "button"){
		isActionsClosed.value = true;
	}
}

function onSignOutButtonClick(){
	localStorage.removeItem("jwt");
	localStorage.removeItem("isSignedIn");
	unsetUser();

	router.push("/auth/sign-in");
}

</script>


<template>
	
	<!-- Navbar for signed out users -->

	<template v-if="!user.isSignedIn">
		<div class="navbar-container">
			<div class="navbar">
				<div class="navbar__logo">
					Deskly
				</div>

				<Button
					class="navbar__menu-button"
					v-if="device.size < 1000"
					variant="text"
					severity="secondary"
					size="large"
					@click="isActionsClosed = !isActionsClosed"
				>
					<i class="pi pi-bars navbar__menu-button-icon" style="font-size: 1.4rem;"></i>
				</Button>
			</div>

			<div 
				class="navbar-actions" 
				:class="isActionsClosed && device.size < 1000 ? 'navbar-actions-closed' : ''"
				@click="closeActions"
			>
				<div class="spacer" v-if="device.size >= 1000"></div>

				<ul class="navbar-actions__links">
					<li 
						v-for="(button, index) in actionButtonsSignedOutUser"
						:key="index"
					>
						<Button
							:label="button.label"
							:class="button.isActive ? 'button-selected' : ''"
							variant="outlined"
							size="small"
							@click="onActionButtonClicked({id: button.id, path: button.path, buttons: actionButtonsSignedOutUser})"
							:pt="{
								root: {
									class: 'navbar-actions__button'
								},
							}"
						/>
					</li>
				</ul>

				<div class="navbar-actions__sign-buttons">
					<Button
						variant="text"
						severity="secondary"
						size="small"
						@click="router.push('/auth/sign-in')"
					>
						Sign in
					</Button>
					
					<Button
						variant="outlined"
						severity="info"
						size="small"
						@click="router.push('/auth/sign-up')"
					>
						Sign up
					</Button>
				</div>
			</div>
		</div>
	</template>

	<!-- Navbar for user-role: user -->

	<template v-if="user.role === 'user'">
		<div class="navbar-container">
			<div class="navbar">
				<div class="navbar__logo">
					Deskly
				</div>

				<Button
					class="navbar__menu-button"
					v-if="device.size < 1000"
					variant="text"
					severity="secondary"
					size="large"
					@click="isActionsClosed = !isActionsClosed"
				>
					<i class="pi pi-bars navbar__menu-button-icon" style="font-size: 1.4rem;"></i>
				</Button>
			</div>

			<div 
				class="navbar-actions" 
				:class="isActionsClosed && device.size < 1000 ? 'navbar-actions-closed' : ''"
				@click="closeActions"
			>
				<div class="spacer" v-if="device.size >= 1000"></div>

				<ul class="navbar-actions__links">
					<li 
						v-for="(button, index) in actionButtonsRoleUser"
						:key="index"
					>
						<Button
							:label="button.label"
							:class="button.isActive ? 'button-selected' : ''"
							variant="outlined"
							size="small"
							@click="onActionButtonClicked({id: button.id, path: button.path, buttons: actionButtonsRoleUser})"
							:pt="{
								root: {
									class: 'navbar-actions__button'
								},
							}"
						/>
					</li>
				</ul>

				<div class="navbar-actions__sign-out">
					<Button
						variant="outlined"
						severity="secondary"
						size="small"
						@click="onSignOutButtonClick"
					>
						Sign out
					</Button>
				</div>
			</div>
		</div>
	</template>
</template>


<style>
ul {
	list-style: none;
	margin: 0;
	padding: 0;
}

.navbar-container {
	position: relative;
	z-index: 2000;
}

.navbar {
	width: 100%;
	height: 40px;
	display: flex;
	align-items: center;
	padding: 0 1rem;
	background-color: var(--nav-bg-color);
}

.navbar__logo {
	font-size: 1.2rem;
	text-transform: uppercase;
	letter-spacing: 1px;
	font-weight: 800;
}

.navbar__menu-button {
	padding: 0 !important;
	margin-left: 0.5rem !important;
}

.navbar__menu-button-icon {
	font-weight: 800;
	color: var(--p-primary-800);
}

.navbar-actions {
	width: 100%;
	max-width: 500px;
	height: calc(100dvh - 40px);
	max-height: 800px;
	position: absolute;
	top: 40px;
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: var(--nav-actions-bg-color);
	backdrop-filter: blur(8px);
	transition: transform 250ms;
}

.navbar-actions.navbar-actions-closed {
	transform: translateY(calc(-100% - 40px));
}

.navbar-actions__links {
	width: 90%;
	display: flex;
	flex-direction: column;
	gap: 1rem;
	margin-top: 2rem;
}

.navbar-actions__button {
	color: var(--p-primary-700) !important;
	border-color: hsl(from var(--p-primary-400) h s calc(l + 5) / 100%) !important;
}

.navbar-actions li .p-button {
	width: 100%;
	min-width: 120px;
}

.navbar-actions__sign-out {
	width: 100%;
	display: flex;
	justify-content: flex-end;
	margin-top: 4rem;
	margin-right: 10%;
}

.navbar-actions__sign-buttons {
	width: 100%;
	display: flex;
	justify-content: flex-end;
	gap: 1rem;
	margin: 2rem 4rem 0 0;

}

.navbar-actions li .p-button.button-selected {
	border: 1px solid var(--button-selected-color);
}

@media(min-width: 1000px) {
	.navbar-actions {
		max-width: unset;
		height: 40px;
		top: 0;
		right: 0;
		flex-direction: row;
		justify-content: space-between;
		background-color: unset;
		backdrop-filter: unset;
	}

	.navbar-actions__links {
		width: unset;
		flex-direction: row;
		align-items: center;
		margin: 0;
	}
	
	.navbar-actions__sign-buttons {
		width: unset;
		margin: 0;
		margin-right: 1rem;
	}

	.navbar-actions__sign-out {
		width: unset;
		margin: 0;
		margin-right: 1rem;
	}
}
</style>
