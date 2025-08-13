<script setup>
import Chart from 'primevue/chart';


const props = defineProps({
    stat: Object,
});

console.log(props.stat);

</script>


<template>    
    <div class="stat">
        <header>
            {{stat.label}}
        </header>
        
        <main>
            <Chart 
                v-if="stat.chartType"
                :type="stat.chartType" 
                :data="stat.chartData"
                :options="{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } }
                }"
                class="chart"
            />

            <div class="count__item"
                v-if="stat.count"
            >
                <div class="count__label">{{stat.count.label}}: </div>
                <div class="count__value">{{stat.count.value}}</div>
            </div>
        </main>
        
        <footer>
        </footer>
    </div>
</template>   


<style scoped>
.stat {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 1.6rem;
    border-radius: 8px;
    border: 1px solid var(--p-surface-500);
}

main {
    margin-top: 1.6rem;
}

.count__item {
    display: flex;
}

.count__label {
    min-width: 88px;
}
</style>
