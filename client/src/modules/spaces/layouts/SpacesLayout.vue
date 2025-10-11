<script setup>
import { onMounted, onBeforeUnmount } from "vue";
import SpaceCard from "@/components/spaceCard/SpaceCard.vue";

const props = defineProps({
	spaces: Array,
});

const emit = defineEmits(["spaces:action"]);

let sentinel = null;
let observer = null;

onMounted(() => {
	sentinel = document.querySelector("#sentinel");

	observer = new IntersectionObserver((entries) => {
		if (entries[0].isIntersecting) {
			emit("spaces:action", {
				action: "loadMoreSpaces",
			});
		}
	});

	observer.observe(sentinel);
});

onBeforeUnmount(() => {
	observer.disconnect();
});
</script>

<template>
	<div class="spaces">
		<div class="space" v-for="(space, index) in spaces" :key="index">
			<SpaceCard :space="space" />
		</div>

		<div id="sentinel"></div>
	</div>
</template>

<style scoped>
.spaces {
	display: grid;
	justify-content: center;
	column-gap: var(--spacing-md);
	row-gap: var(--spacing-md);
}

@media (min-width: 460px) {
	.spaces {
		grid-template-columns: repeat(2, 1fr);
	}
}

@media (min-width: 768px) {
	.spaces {
		grid-template-columns: repeat(3, 1fr);
	}
}

@media (min-width: 1024px) {
	.spaces {
		grid-template-columns: repeat(2, 1fr);
	}
}

@media (min-width: 1300px) {
	.spaces {
		grid-template-columns: repeat(3, 1fr);
	}
}

@media (min-width: 1800px) {
	.spaces {
		grid-template-columns: repeat(4, 1fr);
	}
}
</style>
