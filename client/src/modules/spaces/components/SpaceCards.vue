<script setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import useSpacesStore from "@/stores/useSpacesStore.js";
import useUserStore from "@/stores/useUserStore.js";

const router = useRouter();
const { user } = useUserStore();
const { spacesStoreSpaces } = useSpacesStore();
const showDialog = ref(false);
const createdAt = ref();
const loadedMap = reactive({});

// Very small inline SVG placeholder (instant, no network)
const tinyPlaceholder =
    "data:image/svg+xml;utf8," +
    encodeURIComponent(
        `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="12" viewBox="0 0 20 12">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#e5e7eb"/>
          <stop offset="100%" stop-color="#cbd5e1"/>
        </linearGradient>
      </defs>
      <rect width="20" height="12" fill="url(#g)"/>
    </svg>`,
    );

function onCardClick(space) {
    if (!user.isSignedIn) {
        showDialog.value = true;
    } else {
        router.push(`/book-space?spaceId=${space._id}`);
    }
}

function formatDate(zDate) {
    return new Date(zDate).toLocaleDateString();
}

function getFirstAmenityLabels(space) {
    try {
        return (space.amenities || []).slice(0, 3).map((a) => a.label);
    } catch {
        return [];
    }
}

function getImageUrl(space, index) {
    // For now use local sample images, independent of backend
    const samples = ["/images/spaces/space-1.svg", "/images/spaces/space-2.svg", "/images/spaces/space-3.svg"];
    return samples[index % samples.length];
}

function onImgLoad(key) {
    loadedMap[key] = true;
}

function onImgError(e, space) {
    // Robust fallback on error
    const el = e?.target;
    if (!el) return;
    // Avoid infinite loop by checking a flag
    if (el.__fallbackApplied) return;
    el.__fallbackApplied = true;
    // Use a guaranteed local asset as fallback to avoid CSP/external issues
    el.src = "/favicon.ico";
    // Mark as loaded so skeleton hides
    loadedMap[space._id] = true;
}
</script>

<template>
    <Dialog v-model:visible="showDialog" header="Not signed in" modal>
        <div class="space-card__dialog">
            <div class="space-card__dialog-text">
                <p>To book a working space you need to be signed in.</p>
            </div>

            <div class="space-card__dialog-buttons">
                <Button severity="secondary" @click="router.push('/auth/sign-in')">Sign in</Button>
                <Button @click="router.push('/auth/sign-up')">Sign up</Button>
            </div>
        </div>
    </Dialog>

    <TransitionGroup name="fade" tag="div" class="cards-grid">
        <div
            class="space-card"
            v-for="(space, index) in spacesStoreSpaces"
            :key="space._id"
            @click="onCardClick(space)"
        >
            <div class="space-card__image" :class="{ 'is-loaded': !!loadedMap[space._id] }">
                <img
                    class="full"
                    :src="getImageUrl(space, index)"
                    alt="Space image"
                    :class="{ 'is-loaded': !!loadedMap[space._id] }"
                    loading="lazy"
                    decoding="async"
                    :fetchpriority="index < 4 ? 'high' : 'low'"
                    width="800"
                    height="480"
                    @load="onImgLoad(space._id)"
                    @error="onImgError($event, space)"
                />
                <div class="space-card__price">
                    <span class="price">€{{ space.hourlyRate }}</span>
                    <span class="per">/h</span>
                </div>
            </div>

            <div class="space-card__body">
                <h2 class="space-card__name">{{ space.name }}</h2>
                <p class="space-card__location">
                    <i class="pi pi-map-marker"></i>
                    {{ space.location }}
                </p>
                <p class="space-card__desc">{{ space.description }}</p>

                <div class="space-card__meta">
                    <span class="meta">
                        <i class="pi pi-users"></i>
                        {{ space.capacity }}
                    </span>
                    <span class="meta">
                        <i class="pi pi-clock"></i>
                        {{ formatDate(space.createdAt) }}
                    </span>
                </div>

                <div class="space-card__amenities">
                    <Chip v-for="(label, i) in getFirstAmenityLabels(space)" :key="i" :label="label" />
                </div>
            </div>
        </div>
    </TransitionGroup>
</template>

<style scoped>
.cards-grid {
    display: contents;
}
.fade-enter-active,
.fade-leave-active {
    transition: all 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: translateY(8px);
}
.space-card__dialog-buttons {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    margin-top: 3rem;
}
@keyframes shimmer {
    0% {
        background-position: 100% 0;
    }
    100% {
        background-position: -100% 0;
    }
}

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
    transition:
        box-shadow 180ms,
        transform 180ms;
}
.space-card:hover {
    box-shadow: 0 6px 24px rgba(0, 0, 0, 0.12);
    transform: translateY(-2px);
}

.space-card__image {
    position: relative;
    aspect-ratio: 5/3;
    overflow: hidden;
    background: linear-gradient(90deg, rgba(0, 0, 0, 0.04) 25%, rgba(0, 0, 0, 0.08) 37%, rgba(0, 0, 0, 0.04) 63%);
    background-size: 400% 100%;
    animation: shimmer 1.2s ease-in-out infinite;
}
.space-card__image.is-loaded {
    background: var(--p-surface-200);
    animation: none;
}
.space-card__image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: opacity 300ms ease;
    opacity: 0;
}
.space-card__image img.full.is-loaded {
    opacity: 1;
}
.space-card__price {
    position: absolute;
    left: 0.75rem;
    bottom: 0.75rem;
    background: rgba(0, 0, 0, 0.65);
    color: white;
    padding: 0.2rem 0.5rem;
    border-radius: 6px;
    display: inline-flex;
    gap: 0.15rem;
    align-items: baseline;
}
.space-card__price .price {
    font-weight: 700;
}
.space-card__price .per {
    font-size: 0.8rem;
    opacity: 0.9;
}

.space-card__body {
    padding: 0.75rem 0.9rem 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
}
.space-card__name {
    margin: 0;
    font-size: 1.1rem;
    line-height: 1.2;
}
.space-card__location {
    margin: 0;
    color: var(--p-surface-600);
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
}
.space-card__desc {
    margin: 0;
    color: var(--p-surface-700);
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.space-card__meta {
    display: flex;
    gap: 0.75rem;
    color: var(--p-surface-700);
}
.space-card__meta .meta {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
}
.space-card__amenities {
    display: flex;
    gap: 0.35rem;
    flex-wrap: wrap;
    margin-top: 0.25rem;
}
</style>
