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
import { computed, defineComponent } from 'vue';
import { useStore } from 'src/vue-setup';
import Modal from './modal.vue';

export default defineComponent({
	components: {
		Modal
	},
	setup(props) {
		const { state, dispatch } = useStore();
		return {
			showNewModal: computed(() => state.showNewModal),
			dispatchItem: (name: string, summary: string) => {
				dispatch('addNewItem', { name, summary });
			},
            clearSelections: () => {
                dispatch('clearSelections');
            },
			setNewModalVisibility: (value: boolean) => {
				dispatch('setNewModalVisibility', value);
			},
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
			this.clearSelections();
		},
		addItem() {
			this.dispatchItem(this.name, this.summary);
			this.closeModal();	
		}
	},
});
</script>