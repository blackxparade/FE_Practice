<template>
	<td-modal
	v-if="showNewModal"
	@close="clearCloseNewModal()">
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
			<button class="button" @click="clearCloseNewModal()">Close</button>
		</template>
	</td-modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Item } from 'src/domain/item';
import { useNewItemModalStore } from './modal-newItem.store';

export default defineComponent({
	setup() {
		const { closeNewModal, showNewModal, addItem, clearData, name, summary } = useNewItemModalStore();
		const addItemHandler = () => {
			addItem(Item({ name: name.value, summary: summary.value }));
			closeNewModal();
			clearData();
		};

		const clearCloseNewModal = () => {
			closeNewModal();
			clearData();
		};
		return {
			clearCloseNewModal,
			addItemHandler,
			showNewModal,
			name,
			summary
		};
	}
});
</script>
