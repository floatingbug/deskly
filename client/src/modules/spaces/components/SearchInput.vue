<script setup>
import {ref} from "vue";


const emit = defineEmits(["searchInput:action"]);


const searchInput = ref("");


function filterBySearchInput(){
	emit("searchInput:action", {
		action: "searchInput",
		data: {
			searchInput: searchInput.value,
		}
	});
}

</script>


<template>
	<div class="search-input">
		<InputGroup>
			<InputGroupAddon>
				<i class="pi pi-search" />
			</InputGroupAddon>
		
			<FloatLabel variant="on">
				<InputText v-model="searchInput">
				</InputText>
				<label for="search">Search by City, Country</label>
			</FloatLabel>
			
			<InputGroupAddon>
				<Button 
					style="height: 100%; padding: 0 2rem;"
					@click="filterBySearchInput"
				>
					Search
				</Button>
			</InputGroupAddon>
		</InputGroup>
	</div>
</template>


<style scoped></style>
