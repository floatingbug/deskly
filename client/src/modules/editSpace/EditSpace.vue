<script setup>
import { ref, onMounted } from "vue";
import useSpaceStore from "./stores/useSpaceStore.js";
import useTransferCache from "@/composables/useTransferCache.js";
import MainLayout from "@/layouts/MainLayout.vue";
import EditSpaceForm from "./components/organisms/EditSpaceForm.vue";
import ChangeImagesOrder from "./components/organisms/ChangeImagesOrder.vue";
import ChangeImages from "./components/organisms/ChangeImages.vue";
import apiFetch from "@/api/apiFetch.js";

const { getCache } = useTransferCache();
const { setSpace, getSpace } = useSpaceStore();
let space = null;
const isInitialized = ref(false);

onMounted(async () => {
	const tmpSpace = await getCache();

	if (tmpSpace && !space) setSpace(tmpSpace);
	space = getSpace();

	console.log(space);
	console.log("--------->", space.value.imagesMeta);

	isInitialized.value = true;
});


async function onEditSpaceFormActions(event){
	//add changed fields
	console.log(event);
	const path = "/spaces/update-space";
	const options = {
		method: "PATCH",
		headers: {
			"content-type": "application/json",
		},
		body: JSON.stringify({
			inputs: event.changes.inputs,
			amenities: event.changes.amenities,
			spaceId: event.spaceId,
		}),
	};

	const result = await apiFetch({
		path,
		options,
		addJwt: true,
	});

	console.log(result);
}

async function onChangeImagesOrderActions(event){
	const path = "/spaces/update-screenshot-order";
	const options = {
		method: "PATCH",
		headers: {
			"content-type": "application/json",
		},
		body: JSON.stringify({
			imagesMeta: event.newImagesMeta,
			spaceId: event.spaceId,
		}),
	};

	const result = await apiFetch({
		path,
		options,
		addJwt: true,
	});

	console.log(result);
}

</script>

<template>
	<MainLayout>
		<template #mainContent>
			<div class="edit-space"
				v-if="isInitialized"
			>
				<section>
					<div class="edit-space-form">
						<EditSpaceForm 
							:space="space" 
							@editSpaceForm:action="onEditSpaceFormActions"
						/>
					</div>
				</section>
				
				<section>
					<div class="edit-screenshots">
						<div class="edit-screenshots__header">
							<h2>Edit screenshots</h2>
						</div>

						<div class="edit-screenshots__main">
							<div class="change-images-order">
								<h3 class="title">Change order</h3>
								<span class="subtitle">(drag and drop)</span>
								<ChangeImagesOrder 
									:imagesMeta="space.imagesMeta"
									:spaceId="space._id"
									@changeImagesOrder:action="onChangeImagesOrderActions"
								/>
							</div>
							
							<div class="change-images">
								<h3 class="title">Edit screenshots</h3>
								<ChangeImages :imagesMeta="space.imagesMeta" />
							</div>
						</div>
					</div>
				</section>
			</div>
		</template>
	</MainLayout>
</template>

<style scoped>
.title {
	display: inline-block;
}

.subtitle {
	display: inline-block;
	margin-left: var(--spacing-sm);
	color: var(--color-subtitle);
}

.edit-space {
	width: 100%;
	max-width: 1024px;
}

.edit-space-form {
	width: 100%;
	max-width: 400px;
}

.edit-screenshots {
	width: 100%;
	height: 500px;
	display: flex;
	flex-direction: column;
}

.edit-screenshots__main {
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: calc(var(--spacing-xl) * 2);
}

.change-images-order {
	width: 100%;
}

.change-images {
	width: 100%;
	max-width: 800px;
}

@media(min-width: 1070px) {
	.edit-space {
		display: flex;

	}
}
</style>
