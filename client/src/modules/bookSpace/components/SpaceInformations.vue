<script setup>
const props = defineProps({
	space: Object,
});

</script>


<template>
	<div class="space-informations">
		<header>
			<div class="header__name">
				<h2>
					{{space.name}}
				</h2>
			</div>
			
			<div class="header__description">
				{{space.description}}
			</div>
			
			<div class="header__location">
				{{space.location}}
			</div>
		</header>

		<main>
			<ul class="main__amenities">
				<li
					v-for="(amenity, index) in space.amenities"
				>
					{{amenity.label}}
				</li>
			</ul>

			<div class="main__capacity-hourly-rate-bar">
				<div class="main__capacity">
					<span>Hourly Rate: </span>
					{{space.hourlyRate}}
				</div>

				<div class="main__capacity">
					<span>Capacity: </span>
					{{space.capacity}}
				</div>
			</div>
		</main>

		<footer>
			<div class="date">
				{{space.createdAt}}
			</div>
		</footer>
	</div>
</template>


<style scoped>
ul {
	list-style: disc;
}

.space-informations {
	display: flex;
	flex-direction: column;
	border-radius: 8px;
	overflow: hidden;
}

header {
	padding: 1rem;
}

.header__description {
	font-size: 0.9rem;
}

.header__location {
	margin-top: 1rem;
}

main {
	display: flex;
	justify-content: space-evenly;
	padding: 1rem;
	margin-top: 1rem;
}

.main__amenities, .main__capacity-hourly-rate-bar {
	flex: 1;
	padding-left: 1rem;
}

footer {
	padding: 1rem;
}
</style>
