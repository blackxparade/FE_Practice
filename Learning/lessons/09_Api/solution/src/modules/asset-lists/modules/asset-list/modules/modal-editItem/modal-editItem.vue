<template>
	<td-modal
	v-if="showEditModal"
	@close="closeEditModal()">
		<template #title>
			Edit item
		</template>
		<template #content>
			<input
				v-model="item.name"
				class="input mb-4"
				type="text"
				placeholder="Name">
			<!-- <input
				v-model="selectedItem.value.summary"
				class="input"
				type="text"
				placeholder="Summary"> -->
		</template>
		<template #footer>
			<!-- <button
				class="button"
				:disabled="(!selectedItem.value.name.length || !selectedItem.value.summary.length)"
				@click="editItem()">
				Edit
			</button> -->
			<button class="button" @click="closeEditModal()">Close</button>
		</template>
	</td-modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useEditItemModalStore } from './modal-editItem.store';
import { Item } from 'src/domain';

export default defineComponent({
	setup() {
		const { closeEditModal, updateItem, showEditModal, getSelected } = useEditItemModalStore();
		let item = getSelected.value!;

		const editItem = () => {
			updateItem(item!);
			closeEditModal();
		};
		return {
			closeEditModal,
			showEditModal,
			editItem,
			item
		};
	}
});
</script>
