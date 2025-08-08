<script setup>
import {ref} from "vue";
import {useRouter} from "vue-router";
import useSpacesStore from "@/stores/useSpacesStore.js";
import useUserStore from "@/stores/useUserStore.js";


const router = useRouter();
const {user} = useUserStore();
const {spacesStoreSpaces} = useSpacesStore();
const showDialog = ref(false);
const createdAt = ref();
const loadedMap = ref({});


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

function getFirstAmenityLabels(space){
  try{
    return (space.amenities || []).slice(0, 3).map(a => a.label);
  } catch { return []; }
}

function getImageUrl(space){
  // Placeholder fallback image per space (in real app, use space.imageUrl)
  const seed = encodeURIComponent(space.name || 'space');
  return `https://picsum.photos/seed/${seed}/600/360`;
}

function getPlaceholderUrl(space){
  const seed = encodeURIComponent(space.name || 'space');
  return `https://picsum.photos/seed/${seed}/60/36`;
}

function onImgLoad(key){
  loadedMap.value[key] = true;
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

    <TransitionGroup name="fade" tag="div" class="cards-grid">
    <div 
        class="space-card"
        v-for="(space, index) in spacesStoreSpaces"
        :key="space._id || index"
        @click="onCardClick(space)"
    >
        <div class="space-card__image">
            <img 
              class="placeholder"
              :src="getPlaceholderUrl(space)"
              alt=""
              aria-hidden="true"
              :class="{ 'is-hidden': loadedMap[space._id || index] }"
            />
            <img 
              class="full"
              :src="getImageUrl(space)"
              alt="Space image"
              :class="{ 'is-loaded': loadedMap[space._id || index] }"
              @load="onImgLoad(space._id || index)"
            />
            <div class="space-card__price">
                <span class="price">€{{space.hourlyRate}}</span>
                <span class="per">/h</span>
            </div>
        </div>

		<div class="space-card__body">
			<h2 class="space-card__name">{{space.name}}</h2>
			<p class="space-card__location"><i class="pi pi-map-marker"></i>{{space.location}}</p>
			<p class="space-card__desc">{{space.description}}</p>

			<div class="space-card__meta">
				<span class="meta"><i class="pi pi-users"></i>{{space.capacity}}</span>
				<span class="meta"><i class="pi pi-clock"></i>{{formatDate(space.createdAt)}}</span>
			</div>

			<div class="space-card__amenities">
				<Chip v-for="(label, i) in getFirstAmenityLabels(space)" :key="i" :label="label" />
			</div>
		</div>
    </div>
    </TransitionGroup>
</template>


<style scoped>
.cards-grid { display: contents; }
.fade-enter-active, .fade-leave-active { transition: all .25s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; transform: translateY(8px); }
.space-card__dialog-buttons { width: 100%; display: flex; justify-content: flex-end; gap: 1rem; margin-top: 3rem; }

.space-card {
  width: 100%;
  max-width: 360px;
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  cursor: pointer;
  border: 1px solid var(--space-card-border-color);
  background-color: var(--space-card-bg-color);
  overflow: hidden;
  transition: box-shadow 180ms, transform 180ms;
}
.space-card:hover { box-shadow: 0 6px 24px rgba(0,0,0,0.12); transform: translateY(-2px); }

.space-card__image { position: relative; aspect-ratio: 5/3; background: var(--p-surface-200); overflow: hidden; }
.space-card__image img { width: 100%; height: 100%; object-fit: cover; display: block; transition: opacity 300ms ease; }
.space-card__image img.placeholder { filter: blur(8px); transform: scale(1.05); }
.space-card__image img.placeholder.is-hidden { opacity: 0; }
.space-card__image img.full { opacity: 0; }
.space-card__image img.full.is-loaded { opacity: 1; }
.space-card__price { position: absolute; left: 0.75rem; bottom: 0.75rem; background: rgba(0,0,0,0.65); color: white; padding: 0.2rem 0.5rem; border-radius: 6px; display: inline-flex; gap: 0.15rem; align-items: baseline; }
.space-card__price .price { font-weight: 700; }
.space-card__price .per { font-size: 0.8rem; opacity: 0.9; }

.space-card__body { padding: 0.75rem 0.9rem 1rem; display: flex; flex-direction: column; gap: 0.4rem; }
.space-card__name { margin: 0; font-size: 1.1rem; line-height: 1.2; }
.space-card__location { margin: 0; color: var(--p-surface-600); display: inline-flex; align-items: center; gap: 0.35rem; }
.space-card__desc { margin: 0; color: var(--p-surface-700); display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }

.space-card__meta { display: flex; gap: 0.75rem; color: var(--p-surface-700); }
.space-card__meta .meta { display: inline-flex; align-items: center; gap: 0.35rem; }
.space-card__amenities { display: flex; gap: 0.35rem; flex-wrap: wrap; margin-top: 0.25rem; }
</style>
