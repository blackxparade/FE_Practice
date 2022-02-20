<template>
	<modal
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
				@click="sendTitleToApi()">
				Edit
			</button>
			<button class="button" @click="setEditListModalVisibility(false)">Close</button>
		</template>
	</modal>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useModalStore } from './asset-list/modal.store';
import { useAssetListsStore } from './asset-lists-container.store';
import { List } from 'src/domain';
import Modal from 'src/components/modal.vue';

export default defineComponent({
	components: {
		Modal
	},
	props: {
		id: { type: Number, default: 0 },
		title: { type: String, default: '' }
	},
	setup(props) {
		const { setEditListModalVisibility } = useModalStore();
		const { putListToApi } = useAssetListsStore();
		const listTitle = ref(props.title);
		const sendTitleToApi = () => {
			putListToApi({id: props.id, title: listTitle.value});
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