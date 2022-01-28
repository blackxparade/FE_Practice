<template>
	<div class="page container">
		<main class="main section">

			<!-- ACTION BUTTONS -->
			<div style="display: flex; gap: .5rem;">
				<button 
					class="button is-primary is-light" 
					@click="setNewModalVisibility(true)">
					Add item
				</button>
				<button
					class="button is-light"
					:disabled="selectedItems.length !== 1"
					@click="setEditModalVisibility(true)">
					Edit
				</button>
				<button
					class="button is-danger is-light"
					:disabled="selectedItems.length === 0"
					@click="setDeleteModalVisibility(true)">
					Delete
				</button>
			</div>

			<!-- ASSET ITEM LIST -->
			<div style="display: flex; flex-direction: column; gap: 1rem; margin-top: 1rem;">
				<div v-for="i in items" :key="i.id" style="display: flex; align-content: center; gap: .75rem;">
					<input
						:id="i.item.id"
						v-model="selectedItems"
						type="checkbox"
						:value="i"
						@click="selectionChange(i.item.id)"
						style="margin-top: 1rem;">
					<label :for="i.item.id">
						<item v-bind="i.item" style="cursor: pointer;" />
					</label>
				</div>
			</div>

			<!-- NEW ITEM MODAL -->
			<modal-newItem
			v-if="showNewModal">
			</modal-newItem>

			<!-- EDIT ITEM MODAL -->
			<modal-editItem
			v-if="showEditModal">
			</modal-editItem>

			<!-- DELETE MODAL -->
			<modal-deleteItem
			v-if="showDeleteModal">
			</modal-deleteItem>
		</main>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from 'src/vue-setup';
import Item from './item.vue';
import Modal from './modal.vue';
import ModalEditItem from './modal-editItem.vue';
import ModalNewItem from './modal-newItem.vue';
import ModalDeleteItem from './modal-deleteItem.vue';

/* scaffolding-enable */
export default defineComponent({
	/* scaffolding-disable unless keepExamples */
	components: {
		Item,
		Modal,
		ModalEditItem, 
		ModalNewItem,
		ModalDeleteItem,
	},
	setup(props) {
		const { state, dispatch, getters } = useStore();
		return {
			items: computed(() => state.items),
			showNewModal: computed(() => state.showNewModal),
			showEditModal: computed(() => state.showEditModal),
			showDeleteModal: computed(() => state.showDeleteModal),
			selectedItems: computed(() => getters.selectedItems),
			selectionChange: (id: number) => {
				dispatch('selectionChange', id);
			},
			setNewModalVisibility: (value: boolean) => {
				dispatch('setNewModalVisibility', value);
			},
			setEditModalVisibility: (value: boolean) => {
				dispatch('setEditModalVisibility', value);
			},
			setDeleteModalVisibility: (value: boolean) => {
				dispatch('setDeleteModalVisibility', value);
			}
		};
	},
	data() {
		return {
			item: {
				id: -1,
				name: '',
				summary: '',
			},
		};
	},
	computed: {
		console: () => console,
		window: () => window,
	}
});
/* scaffolding-disable unless keepExamples */

</script>