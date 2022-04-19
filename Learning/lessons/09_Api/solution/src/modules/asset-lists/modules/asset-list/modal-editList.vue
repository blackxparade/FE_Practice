<template>
	<td-modal
	@close="setEditListModalVisibility(false)">
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
			<button class="button" @click="setEditListModalVisibility(false)">Close</button>
		</template>
	</td-modal>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useModalStore } from './modal.store';
import { useAssetListsStore } from '../../asset-lists.store';

export default defineComponent({
	props: {
		id: { type: Number }
	},
	setup(props) {
		const { setEditListModalVisibility } = useModalStore();
		const { putListToApi, lists } = useAssetListsStore();
		let list = ref(lists.value!.filter(element => element.id === props.id)[0]);
		const listTitle = ref(list.value.title);
		const sendTitleToApi = () => {
			putListToApi({id: list.value.id, title: listTitle.value, items: list.value.items});
			setEditListModalVisibility(false);
		};
		return {
			listTitle,
			setEditListModalVisibility,
			sendTitleToApi
		};
	}
});
</script>
