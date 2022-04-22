<template>
	<td-modal
	v-if="showEditListModal"
	@close="closeEditListModal()">
		<template #title>
			Edit list title
		</template>
		<template #content>
			<input
				v-model="listTitle"
				class="input mb-4"
				type="text"
				placeholder="List title">
		</template>
		<template #footer>
			<button
				class="button"
				:disabled="(!listTitle.length)"
				@click="sendTitleToApi(); this.$emit('sentTitle');">
				Edit
			</button>
			<button class="button" @click="closeEditListModal()">Close</button>
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
		const { showEditListModal, closeEditListModal, putListToApi, lists } = useEditListModalStore();
		const list = ref(lists.value!.filter(element => element.id === props.id)[0]);
		const listTitle = ref(list.value.title);
		const sendTitleToApi = () => {
			putListToApi({id: list.value.id, title: listTitle.value, items: list.value.items});
			closeEditListModal();
		};
		return {
			listTitle,
			showEditListModal,
			closeEditListModal,
			sendTitleToApi
		};
	}
});
</script>
