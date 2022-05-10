<template>
	<td-modal
	v-if="showEditListModal"
	@close="closeEditListModal()"
	data-testid="modal-edit-list">
		<template #title>
			Edit list title
		</template>
		<template #content>
			<input
				v-model="listTitle"
				class="input mb-4"
				type="text"
				placeholder="List title"
				data-testid="modal-edit-list-input">
		</template>
		<template #footer>
			<button
				class="button"
				:disabled="(!listTitle.length)"
				@click="sendTitleToApiAndClose(listTitle)"
				data-testid="modal-edit-list-primary">
				Edit
			</button>
			<button class="button" @click="closeEditListModal()" data-testid="modal-edit-list-close">Close</button>
		</template>
	</td-modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useEditListModalStore } from './modal-editList.store';

export default defineComponent({
	setup() {
		const { showEditListModal, closeEditListModal, sendTitleToApiAndClose, listTitle } = useEditListModalStore();

		return {
			listTitle,
			showEditListModal,
			closeEditListModal,
			sendTitleToApiAndClose
		};
	}
});
</script>
