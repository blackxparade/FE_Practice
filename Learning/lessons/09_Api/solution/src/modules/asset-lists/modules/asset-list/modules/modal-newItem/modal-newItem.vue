<template>
	<td-modal
	v-if="showNewModal"
	@close="closeNewModal()">
		<template #title>
			Add Item
		</template>
		<template #content>
			<input
				v-model="name"
				class="input mb-4"
				type="text"
				placeholder="Name">
			<input
				v-model="summary"
				class="input"
				type="text"
				placeholder="Summary">
		</template>
		<template #footer>
			<button
				class="button"
				:disabled="(!name.length || !summary.length)"
				@click="addItemHandler()">
				Add
			</button>
			<button class="button" @click="closeNewModal()">Close</button>
		</template>
	</td-modal>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { Item } from 'src/domain/item';
import { useNewItemModalStore } from './modal-newItem.store';
import { useAssetListStore } from './../../asset-list.store';

export default defineComponent({
	setup() {
		const name = ref("");
		const summary = ref("");
		const { closeNewModal, showNewModal } = useNewItemModalStore();
		const { addItem } = useAssetListStore();
		const addItemHandler = () => {
			addItem(Item({ name: name.value, summary: summary.value }));
			closeNewModal()
		};
		return {
			closeNewModal,
			addItemHandler,
			showNewModal,
			name,
			summary
		};
	}
});
</script>
