<template>
	<div>
		<button
			class="button is-light"
			:disabled="isDisabled"
			@click="openEditModal()">
			Edit
		</button>
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
				<input
					v-model="item.summary"
					class="input"
					type="text"
					placeholder="Summary">
			</template>
			<template #footer>
				<button
					class="button"
					:disabled="(!item.name.length || !item.summary.length)"
					@click="editItem()">
					Edit
				</button>
				<button class="button" @click="closeEditModal()">Close</button>
			</template>
		</td-modal>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useEditItemModalStore } from './modal-editItem.store';

export default defineComponent({
	props: {
		isDisabled: { type: Boolean, default: true }
	},
	setup() {
		const { closeEditModal, updateItem, showEditModal, item, openEditModal } = useEditItemModalStore();
	
		const editItem = () => {
			updateItem(item.value);
			closeEditModal();
		};
		return {
			closeEditModal,
			openEditModal,
			showEditModal,
			editItem,
			item
		};
	}
});
</script>
