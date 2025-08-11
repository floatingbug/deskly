<script setup>
const props = defineProps({
    stat: Object,
});


</script>


<template>    
    <div class="stat">
        <header>
        </header>
        
        <main>
            <div class="stat__count">
                <div class="stat__count-label">
                    {{stat.count.label}}:
                </div>
        
                <div class="stat__count-value">
                    {{stat.count.value}}
                </div>
            </div>
        </main>
        
        <footer>
        </footer>
    </div>
</template>   


<style scoped>
.stat {
    flex: 1;
    padding: 1.2rem;
    border-radius: 8px;
    border: 1px solid var(--p-surface-500);
}

.stat__count {
    display: flex;
    gap: 0.8rem;
}
</style>
