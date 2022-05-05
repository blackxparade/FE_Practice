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
				v-model="list.title"
				class="input mb-4"
				type="text"
				placeholder="List title"
				data-testid="modal-edit-list-input">
		</template>
		<template #footer>
			<button
				class="button"
				:disabled="(!list.title.length)"
				@click="sendTitleToApiAndClose(list); this.$emit('sentTitle');"
				data-testid="modal-edit-list-primary">
				Edit
			</button>
			<button class="button" @click="closeEditListModal()" data-testid="modal-edit-list-close">Close</button>
		</template>
	</td-modal>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useEditListModalStore } from './modal-editList.store';

export default defineComponent({
	props: {
		id: { type: Number }
	},
	setup(props) {
		const { showEditListModal, closeEditListModal, sendTitleToApiAndClose, lists, list } = useEditListModalStore();
		list.value = ref(lists.value!.filter(element => element.id === props.id)[0]).value;
		//const listTitle = ref(list.value.title);

		return {
			list,
			//listTitle,
			showEditListModal,
			closeEditListModal,
			sendTitleToApiAndClose
		};
	}
});
</script>
