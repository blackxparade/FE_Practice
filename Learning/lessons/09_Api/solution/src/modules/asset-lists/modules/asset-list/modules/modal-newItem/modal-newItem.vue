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
import { defineComponent, ref } from 'vue';
import { Item } from 'src/domain/item';
import { useNewItemModalStore } from './modal-newItem.store';

export default defineComponent({
	setup() {
		const name = ref("");
		const summary = ref("");
		const { closeNewModal, showNewModal, addItem } = useNewItemModalStore();
		const addItemHandler = () => {
			addItem(Item({ name: name.value, summary: summary.value }));
			closeNewModal();
			clearData();
		};
		const clearData = () => {
			name.value = "";
			summary.value = "";
		};
		const clearCloseNewModal = () => {
			closeNewModal();
			clearData();
		};
		return {
			closeNewModal,
			addItemHandler,
			showNewModal,
			name,
			summary,
			clearCloseNewModal
		};
	}
});
</script>
