<script setup>
import { ref, onMounted, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import useUserStore from "@/stores/useUserStore.js";
import useDevice from "@/composables/useDevice.js";

const { device } = useDevice();
const { user, unsetUser } = useUserStore();
const router = useRouter();
const route = useRoute();
const isActionsClosed = ref(true);
const actionButtonsRoleUser = ref([
    {
        label: "Dashboard",
        id: "dashboard",
        isActive: false,
        path: "/dashboard/user",
        icon: "pi pi-th-large",
    },
    {
        label: "Spaces",
        id: "spaces",
        isActive: false,
        path: "/spaces",
        icon: "pi pi-th-large",
    },
    {
        label: "Inbox",
        id: "inbox",
        isActive: false,
        path: "/inbox",
        icon: "pi pi-envelope",
    },
]);

const actionButtonsRoleHost = ref([
    {
        label: "Dashboard",
        id: "dashboard",
        isActive: false,
        path: "/dashboard/host",
        icon: "pi pi-th-large",
    },
    {
        label: "Add Space",
        id: "addSpace",
        isActive: false,
        path: "/add-space",
        icon: "pi pi-plus",
    },
    {
        label: "Inbox",
        id: "inbox",
        isActive: false,
        path: "/inbox",
        icon: "pi pi-envelope",
    },
]);

const actionButtonsSignedOutUser = ref([
    {
        label: "Home",
        id: "home",
        isActive: false,
        path: "/",
        icon: "pi pi-home",
    },
    {
        label: "Spaces",
        id: "spaces",
        isActive: false,
        path: "/spaces",
        icon: "pi pi-th-large",
    },
]);

onMounted(() => {
    // activate home or dashboard button
    if (!user.isSignedIn) {
        actionButtonsSignedOutUser.value[0].isActive = true;
    } else if (user.role === "user") {
        actionButtonsRoleUser.value[0].isActive = true;
    } else {
        actionButtonsRoleHost.value[0].isActive = true;
    }
});

// activate button if route change
watch(
    () => route.fullPath,
    (fullPath) => {
        if (!user.isSignedIn) {
            const button = actionButtonsSignedOutUser.value.find((button) => button.path === fullPath);
            if (button) button.isActive = true;
        } else if (user.role === "user") {
            const button = actionButtonsRoleUser.value.find((button) => button.path === fullPath);
            if (button) button.isActive = true;
        } else if (user.role === "host") {
            const button = actionButtonsRoleHost.value.find((button) => button.path === fullPath);
            if (button) button.isActive = true;
        }
    },
);

function onActionButtonClicked({ id, path, buttons }) {
    buttons.forEach((button) => (button.isActive = false));
    buttons.find((button) => button.id === id).isActive = true;

    router.push(path);
}

function closeActions(event) {
    if (event.target.attributes.type && event.target.attributes.type.value === "button") {
        isActionsClosed.value = true;
    }
}

function onSignOutButtonClick() {
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
                <div class="navbar__logo">Deskly</div>

                <Button
                    class="navbar__menu-button"
                    v-if="device.size < 1000"
                    variant="text"
                    severity="secondary"
                    size="large"
                    @click="isActionsClosed = !isActionsClosed"
                >
                    <i class="pi pi-bars navbar__menu-button-icon" style="font-size: 1.4rem"></i>
                </Button>
            </div>

            <div
                class="navbar-actions"
                :class="isActionsClosed && device.size < 1000 ? 'navbar-actions-closed' : ''"
                @click="closeActions"
            >
                <div class="spacer" v-if="device.size >= 1000"></div>

                <ul class="navbar-actions__links">
                    <li v-for="(button, index) in actionButtonsSignedOutUser" :key="index">
                        <Button
                            :label="button.label"
                            :icon="button.icon"
                            :class="button.isActive ? 'button-selected' : ''"
                            variant="outlined"
                            size="small"
                            @click="
                                onActionButtonClicked({
                                    id: button.id,
                                    path: button.path,
                                    buttons: actionButtonsSignedOutUser,
                                })
                            "
                            :pt="{
                                root: {
                                    class: 'navbar-actions__button',
                                },
                            }"
                        />
                    </li>
                </ul>

                <div class="navbar-actions__sign-buttons">
                    <Button variant="text" severity="contrast" size="small" @click="router.push('/auth/sign-in')">
                        Sign in
                    </Button>

                    <Button severity="contrast" size="small" @click="router.push('/auth/sign-up')">Sign up</Button>
                </div>
            </div>
        </div>
    </template>

    <!-- Navbar for user-role: user -->

    <template v-if="user.role === 'user'">
        <div class="navbar-container">
            <div class="navbar">
                <div class="navbar__logo">Deskly</div>

                <Button
                    class="navbar__menu-button"
                    v-if="device.size < 1000"
                    variant="text"
                    severity="secondary"
                    size="large"
                    @click="isActionsClosed = !isActionsClosed"
                >
                    <i class="pi pi-bars navbar__menu-button-icon" style="font-size: 1.4rem"></i>
                </Button>
            </div>

            <div
                class="navbar-actions"
                :class="isActionsClosed && device.size < 1000 ? 'navbar-actions-closed' : ''"
                @click="closeActions"
            >
                <div class="spacer" v-if="device.size >= 1000"></div>

                <ul class="navbar-actions__links">
                    <li v-for="(button, index) in actionButtonsRoleUser" :key="index">
                        <Button
                            :label="button.label"
                            :icon="button.icon"
                            :class="button.isActive ? 'button-selected' : ''"
                            variant="outlined"
                            @click="
                                onActionButtonClicked({
                                    id: button.id,
                                    path: button.path,
                                    buttons: actionButtonsRoleUser,
                                })
                            "
                            :pt="{
                                root: {
                                    class: 'navbar-actions__button',
                                },
                            }"
                        />
                    </li>
                </ul>

                <div class="navbar-actions__sign-out">
                    <Button severity="secondary" size="small" @click="onSignOutButtonClick">Sign out</Button>
                </div>
            </div>
        </div>
    </template>

    <!-- Navbar for user-role: host -->

    <template v-if="user.role === 'host'">
        <div class="navbar-container">
            <div class="navbar">
                <div class="navbar__logo">Deskly</div>

                <Button
                    class="navbar__menu-button"
                    v-if="device.size < 1000"
                    variant="text"
                    severity="secondary"
                    size="large"
                    @click="isActionsClosed = !isActionsClosed"
                >
                    <i class="pi pi-bars navbar__menu-button-icon" style="font-size: 1.4rem"></i>
                </Button>
            </div>

            <div
                class="navbar-actions"
                :class="isActionsClosed && device.size < 1000 ? 'navbar-actions-closed' : ''"
                @click="closeActions"
            >
                <div class="spacer" v-if="device.size >= 1000"></div>

                <ul class="navbar-actions__links">
                    <li v-for="(button, index) in actionButtonsRoleHost" :key="index">
                        <Button
                            :label="button.label"
                            :icon="button.icon"
                            :class="button.isActive ? 'button-selected' : ''"
                            variant="outlined"
                            @click="
                                onActionButtonClicked({
                                    id: button.id,
                                    path: button.path,
                                    buttons: actionButtonsRoleHost,
                                })
                            "
                            :pt="{
                                root: {
                                    class: 'navbar-actions__button',
                                },
                            }"
                        />
                    </li>
                </ul>

                <div class="navbar-actions__sign-out">
                    <Button severity="secondary" size="small" @click="onSignOutButtonClick">Sign out</Button>
                </div>
            </div>
        </div>
    </template>
</template>

<style scoped>
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
    border-bottom: 1px solid var(--p-surface-500);
    background-color: var(--nav-bg-color);
}

.navbar__logo {
    font-size: 1.2rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: 800;
    color: var(--p-primary-contrast-color);
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
    color: var(--p-primary-contrast-color) !important;
    border-color: hsl(from var(--p-primary-400) h s calc(l + 5) / 100%) !important;
}

.navbar-actions__button:hover {
    color: var(--p-primary-color) !important;
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
    color: var(--p-primary-color) !important;
    background-color: var(--p-primary-contrast-color);
}

@media (min-width: 1000px) {
    .navbar {
        height: 48px;
    }

    .navbar-actions {
        max-width: unset;
        height: 48px;
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
