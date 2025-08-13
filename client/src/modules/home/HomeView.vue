<script setup>
import { useRouter } from "vue-router";
import useUserStore from "@/stores/useUserStore.js";

const router = useRouter();
const { user } = useUserStore();

function navigateToSpaces() {
    router.push("/spaces");
}

function navigateToSignIn() {
    router.push("/auth/sign-in");
}

function navigateToSignUp() {
    router.push("/auth/sign-up");
}

function navigateToDashboard() {
    if (user.role === "host") {
        router.push("/dashboard/host");
    } else {
        router.push("/dashboard/user");
    }
}

function navigateToAddSpace() {
    router.push("/add-space");
}
</script>

<template>
    <div class="home">
        <section class="hero">
            <div class="hero__content">
                <h1 class="hero__title">Find your perfect workspace</h1>
                <p class="hero__subtitle">Book desks, rooms and creative spaces from trusted hosts.</p>

                <div class="hero__actions">
                    <Button
                        label="Explore spaces"
                        icon="pi pi-search"
                        size="large"
                        @click="navigateToSpaces"
                        :pt="{ root: { class: 'hero__primary-cta' } }"
                    />

                    <div class="hero__secondary-actions">
                        <Button
                            v-if="!user.isSignedIn"
                            label="Sign in"
                            variant="text"
                            size="small"
                            severity="contrast"
                            @click="navigateToSignIn"
                        />

                        <Button v-if="!user.isSignedIn" label="Sign up" size="small" @click="navigateToSignUp" />

                        <Button
                            v-else
                            label="Go to dashboard"
                            size="small"
                            severity="secondary"
                            icon="pi pi-th-large"
                            @click="navigateToDashboard"
                        />
                    </div>
                </div>
            </div>
        </section>

        <section class="features">
            <div class="feature-card">
                <i class="pi pi-map-marker feature-card__icon" aria-hidden="true"></i>
                <h3 class="feature-card__title">Great locations</h3>
                <p class="feature-card__text">Find spaces near you or discover new areas to work from.</p>
            </div>

            <div class="feature-card">
                <i class="pi pi-clock feature-card__icon" aria-hidden="true"></i>
                <h3 class="feature-card__title">Flexible slots</h3>
                <p class="feature-card__text">Book by hour or day depending on your needs.</p>
            </div>

            <div class="feature-card">
                <i class="pi pi-shield feature-card__icon" aria-hidden="true"></i>
                <h3 class="feature-card__title">Secure booking</h3>
                <p class="feature-card__text">Verified hosts and transparent cancellation policies.</p>
            </div>
        </section>

        <section class="host-cta">
            <div class="host-cta__content">
                <h2 class="host-cta__title">Become a host</h2>
                <p class="host-cta__text">
                    Earn by listing your office or meeting space. It only takes a minute to get started.
                </p>
                <Button label="Add a space" icon="pi pi-plus" size="small" @click="navigateToAddSpace" />
            </div>
        </section>
    </div>
</template>

<style scoped>
.home {
    display: flex;
    flex-direction: column;
    gap: 3rem;
}

.hero {
    width: 100%;
    display: flex;
    justify-content: center;
    background: linear-gradient(180deg, hsl(from var(--p-primary-800) h s calc(l + 5) / 18%) 0%, transparent 100%);
}

.hero__content {
    width: min(1100px, 92%);
    padding: 3rem 0 2rem 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
}

.hero__title {
    margin: 0;
    font-size: clamp(1.8rem, 2.8vw, 3rem);
    line-height: 1.2;
    color: var(--p-primary-900);
}

.hero__subtitle {
    margin: 0;
    color: var(--p-surface-700);
}

.hero__actions {
    margin-top: 1rem;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
}

.hero__primary-cta {
    min-width: 180px;
}

.hero__secondary-actions {
    display: flex;
    gap: 0.5rem;
}

.features {
    width: min(1100px, 92%);
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 1rem;
}

@media (min-width: 700px) {
    .features {
        grid-template-columns: repeat(3, 1fr);
    }
}

.feature-card {
    border: 1px solid var(--p-surface-300);
    background: var(--p-surface-0);
    padding: 1rem;
    border-radius: 10px;
}

.feature-card__icon {
    font-size: 1.6rem;
    color: var(--p-primary-600);
}

.feature-card__title {
    margin: 0.6rem 0 0.25rem 0;
    font-size: 1.1rem;
}

.feature-card__text {
    margin: 0;
    color: var(--p-surface-700);
}

.host-cta {
    width: 100%;
    display: flex;
    justify-content: center;
}

.host-cta__content {
    width: min(1100px, 92%);
    border: 1px dashed var(--p-primary-300);
    background: hsl(from var(--p-primary-50) h s l / 60%);
    padding: 1rem;
    border-radius: 10px;
}

.host-cta__title {
    margin: 0 0 0.25rem 0;
}

.host-cta__text {
    margin: 0 0 0.75rem 0;
    color: var(--p-surface-700);
}
</style>
