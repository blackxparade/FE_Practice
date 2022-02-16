<template>
	<modal
	@close="setEditModalVisibility(false)">
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
			<button class="button" @click="setEditModalVisibility(false)">Close</button>
		</template>
	</modal>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useModalStore } from './modal.store';
import { useAssetListStore } from './asset-list.store';
import Modal from 'src/components/modal.vue';
import { Item } from 'src/domain';

export default defineComponent({
	components: {
		Modal,
	},

	setup() {
		const { getSelected, updateItem } = useAssetListStore();
		const { setEditModalVisibility } = useModalStore();
		let item = Item({name: getSelected.value!.name, summary: getSelected.value!.summary});
		const editItem = () => {
			updateItem(item);
			setEditModalVisibility(false);
		};
		return {
			setEditModalVisibility,
			editItem,
			item
		};
	}
});
</script>
