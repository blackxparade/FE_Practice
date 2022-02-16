<template>
	<modal
	@close="setNewModalVisibility(false)">
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
			<button class="button" @click="setNewModalVisibility(false)">Close</button>
		</template>
	</modal>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { Item } from 'src/domain/item';
import Modal from 'src/components/modal.vue';
import { useModalStore } from './modal.store';
import { useAssetListStore } from './asset-list.store';

export default defineComponent({
	components: {
		Modal
	},
	setup() {
		const name = ref("");
		const summary = ref("");
		const { setNewModalVisibility } = useModalStore();
		const { addItem } = useAssetListStore();
		const addItemHandler = () => {
			addItem(Item({ name: name.value, summary: summary.value }));
			setNewModalVisibility(false)
		};
		return {
			addItem,
			setNewModalVisibility,
			addItemHandler,
			name,
			summary
		};
	}
});
</script>