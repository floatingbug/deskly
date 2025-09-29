<script setup>
import { ref, onMounted } from "vue";
import ImageCarousel from "../molecules/ImageCarousel.vue";


const props = defineProps({
    space: Object,
});


const createdAt = ref();


onMounted(() => {
    createdAt.value = new Date(props.space.createdAt).toLocaleDateString();
});

</script>

<template>
    <div class="space-informations">
        <header>
            <div class="header__name">
                <h2>
                    {{ space.name }}
                </h2>
            </div>

			<div class="header__carousel">
				<ImageCarousel :imageUrls="space.imageUrls" />
			</div>

            <div class="header__items">
            	<div class="header__item">
            		<div class="header__description">
            		    {{ space.description }}
            		</div>
            	</div>
            	
            	<div class="header__item header__item-location">
            		<div class="header__location">
            		    {{ space.address}}
            		</div>
            	</div>
            </div>
        </header>

        <div class="content">
            <div class="content__items">
            	<ul>
            	    <li v-for="(amenity, index) in space.amenities">
            	        {{ amenity.label }}
            	    </li>
            	</ul>
            </div>

            <div class="content__items">
                <div class="content__items-item">
                    <span>Hourly Rate:</span>
                    <div class="content__item-value">
                    	{{ space.hourlyRate }}
                    </div>
                </div>

                <div class="content__items-item">
                    <span>Capacity:</span>
                    <div class="content__item-value">
                    	{{ space.capacity }}
                    </div>
                </div>
            </div>
        </div>

        <footer>
            <div class="date">
                <span>Created at:</span>
                {{ createdAt }}
            </div>
        </footer>
    </div>
</template>

<style scoped>
.space-informations {
	width: 100%;
    display: flex;
    flex-direction: column;
}

.header__carousel {
	margin: calc(var(--spacing-xl) * 2) 0;
}

.header__items {
	display: flex;
	flex-direction: column;
	gap: var(--spacing-md);
}

.header__item-location {
	color: var(--color-subtitle);
}

.content {
	max-width: 400px;
	display: flex;
	justify-content: space-between;
	margin: calc(var(--spacing-lg) * 2) 0;
}

.content__items {
	display: flex;
	flex-direction: column;
	gap: var(--spacing-md);
	margin: var(--spacing-md) 0;
}

.content ul {
	display: flex;
	flex-direction: column;
	gap: var(--spacing-md);
	padding: 0 0 0 var(--spacing-md);
	margin: 0;
}

.content__items-item > span {
	display: inline-block;
	min-width: 96px;
}

.content__item-value {
	display: inline-block;
	font-weight: bold;
	color: var(--color-primary);
}

footer {
	margin: var(--spacing-md) 0;
}

footer .date {
	color: var(--color-subtitle);
}
</style>
