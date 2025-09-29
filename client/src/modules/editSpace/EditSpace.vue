<script setup>
import {ref, onMounted} from "vue";
import useSpaceStore from "./stores/useSpaceStore.js";
import useTransferCache from "@/composables/useTransferCache.js";
import MainLayout from "@/layouts/MainLayout.vue";
import EditSpaceForm from "./components/organisms/EditSpaceForm.vue";


const {getCache} = useTransferCache();
const {setSpace, getSpace} = useSpaceStore();
let space = null;


onMounted(async () => {
	const tmpSpace = await getCache();

	if(tmpSpace && !space) setSpace(tmpSpace);
	space = getSpace();
	
	console.log(space.value);
});

</script>


<template>
	<MainLayout>
		<template #mainContent>
			<EditSpaceForm :space="space" />
		</template>
	</MainLayout>
</template>


<style scoped></style>
