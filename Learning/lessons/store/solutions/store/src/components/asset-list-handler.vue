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
					:disabled="checkedItems.length !== 1"
					@click="prefillModal()">
					Edit
				</button>
				<button
					class="button is-danger is-light"
					:disabled="checkedItems.length === 0"
					@click="setDeleteModalVisibility(true)">
					Delete
				</button>
			</div>

			<!-- ASSET ITEM LIST -->
			<div style="display: flex; flex-direction: column; gap: 1rem; margin-top: 1rem;">
				<div v-for="item in items" :key="item.id" style="display: flex; align-content: center; gap: .75rem;">
					<input
						:id="item.id"
						v-model="checkedItems"
						type="checkbox"
						:value="item"
						style="margin-top: 1rem;">
					<label :for="item.id">
						<item v-bind="item" style="cursor: pointer;" />
					</label>
				</div>
			</div>

			<!-- NEW ITEM MODAL -->
			<modal-editItem
				v-bind="item"
				v-if="showNewModal"
				@close="setNewModalVisibility(false)"
				@inputChange="inputChange"
				@modalClose="closeModalHandler()">
				<template #title>Add item</template>
				<template #actionButtonLabel>Add</template>
			</modal-editItem>

			<!-- EDIT ITEM MODAL -->
			<modal-editItem
				v-bind="item"
				v-if="showEditModal"
				@close="setEditModalVisibility(false)"
				@inputChange="inputChange"
				@modalClose="closeModalHandler()">
				<template #title>Edit item</template>
				<template #actionButtonLabel>Edit</template>
			</modal-editItem>

			<!-- DELETE MODAL -->
			<modal
				v-if="showDeleteModal"
				@close="clearData(); setDeleteModalVisibility(false);">
				<template #title>
					Deleting items
				</template>
				<template #content>
					<strong>Are you sure to delete these items?</strong>
					<ul style="margin-top: 1rem;">
						<li v-for="item in checkedItems" :key="item.id">
							{{ listItemInfo(item) }}
						</li>
					</ul>
				</template>
				<template #footer>
					<button
						class="button"
						@click="deleteItemHandler()">
						Delete
					</button>
					<button 
						class="button" 
						@click="setDeleteModalVisibility(false);">
						Close
					</button>
				</template>
			</modal>
		</main>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from 'src/vue-setup';
import Item from './item.vue';
import Modal from './modal.vue';
import ModalEditItem from './modal-editItem.vue';

/* scaffolding-enable */
export default defineComponent({
	/* scaffolding-disable unless keepExamples */
	components: {
		Item,
		ModalEditItem, 
		Modal,
	},
	setup(props) {
		const { state, dispatch } = useStore();
		return {
			items: computed(() => state.items),
			showNewModal: computed(() => state.showNewModal),
			showEditModal: computed(() => state.showEditModal),
			showDeleteModal: computed(() => state.showDeleteModal),
			checkedItems: computed({
				get: () => state.checkedItems,
				set: value => {
					dispatch('updateCheckedItems', value)
				}
			}),
			deleteItems: (ids: number[]) => {
				dispatch('deleteItems', ids);
			},
			setNewModalVisibility: (value: boolean) => {
				dispatch('setNewModalVisibility', value);
			},
			setEditModalVisibility: (value: boolean) => {
				dispatch('setEditModalVisibility', value);
			},
			setDeleteModalVisibility: (value: boolean) => {
				dispatch('setDeleteModalVisibility', value);
			},
		};
	},
	data() {
		return {
			item: {
				isEditMode: false,
				id: -1,
				name: '',
				summary: '',
			},
		};
	},
	computed: {
		console: () => console,
		window: () => window,
	},
	methods: {
		inputChange(value: any) {
			this.item.name = value.name;
			this.item.summary = value.summary;
		},
		listItemInfo(item: any) { 
			return `${item.id} - ${item.name}, ${item.summary}`; 
		},
		clearData() {
			this.item.name = '';
			this.item.summary = '';
			return ;
		},
		prefillModal() {
			this.item.isEditMode = true;
			this.item.id = this.checkedItems[0].id;
			this.item.name = this.checkedItems[0].name;
			this.item.summary = this.checkedItems[0].summary;
			this.setEditModalVisibility(true);
		},
		getDeletableItemIds() {
			let toDelete: number[] = [];
			for (let i=0; i<this.checkedItems.length; i++) {
				toDelete.push(this.checkedItems[i].id);
			}
			return toDelete;
		},
		closeModalHandler() {
			this.clearData();
			this.clearSelections();
			this.item.isEditMode = false;
		},
		deleteItemHandler(){
			this.deleteItems(this.getDeletableItemIds()); 
			this.clearData(); 
			this.clearSelections(); 
			this.setDeleteModalVisibility(false);
		},
		clearSelections() {
			this.checkedItems = [];
		}
	},
});
/* scaffolding-disable unless keepExamples */

</script>