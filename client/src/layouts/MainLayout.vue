<script setup>
import TheTopBar from "@/components/topBar/TheTopBar.vue";
import TheMenu from "@/components/menu/TheMenu.vue";
import useStateStore from "@/stores/useStateStore.js";


const {state} = useStateStore();

</script>


<template>    
    <div class="main-layout">
        <div class="top-bar">
			<TheTopBar />
        </div>
    
        <div class="menu-left"
            :class="!state.isSideMenuOpen ? 'menu-left-closed' : ''"
        >
			<TheMenu />
        </div>
    
        <div class="main-container">
            <slot name="mainContent" />
        </div>
    </div>
</template>   


<style scoped>
.main-layout {
    width: 100%;
    display: flex;
}

.top-bar {
    width: 100%;
    height: calc(var(--spacing-lg) * 2);
    position: fixed;
    z-index: 4000;
}

.menu-left {
    width: 250px;
    height: calc(100dvh - var(--spacing-xl) * 3);
    padding: var(--spacing-xl);
    margin-top: calc(var(--spacing-xl) * 2.5);
    margin-left: var(--spacing-md);
    z-index: 2000;
    transition: margin 250ms;
}

.menu-left-closed {
    margin-left: -250px;
}

.main-container {
    width: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding: var(--spacing-xs);
    margin-top: calc(var(--spacing-xl) * 2.5);
	margin-bottom: 12rem;
}

@media(max-width: 1024px){
    .menu-left {
        position: fixed;
        padding: 0;
    }
}
</style>

