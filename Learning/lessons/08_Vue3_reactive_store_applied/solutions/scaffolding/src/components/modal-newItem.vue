<template>
	<modal
	@close="closeModal">
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
				@click="addItem()">
				Add
			</button>
			<button class="button" @click="closeModal()">Close</button>
		</template>
	</modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Item } from 'src/domain/item';
import Modal from './modal.vue';
import { useModalStore } from 'src/modules/modal.store';
import { useAssetListStore } from 'src/modules/asset-list.store';

export default defineComponent({
	components: {
		Modal
	},
	setup() {
		return {
			...useAssetListStore(),
			...useModalStore(),
		};
	},
    data() {
		return {
            name: '',
            summary: '',
		};
	},
	methods: {
		closeModal() {
			this.setNewModalVisibility(false);
		},
		addItem() {
			console.log("yay");
			this.addItem(Item({ name: this.name, summary: this.summary }));
			this.closeModal();	
		}
	},
});
</script>