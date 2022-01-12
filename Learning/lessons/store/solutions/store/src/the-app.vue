<template>
	<div class="page container">
		<main class="main section">
			<div style="display: flex; gap: .5rem;">
				<button class="button is-primary is-light" @click="setNewModalVisibility(true)">Add item</button>
				<button
					class="button is-light"
					:disabled="checkedItems.length !== 1"
					@click="prefillModal">
					Edit
				</button>
				<button
					class="button is-danger is-light"
					:disabled="checkedItems.length === 0"
					@click="setDeleteModalVisibility(true)">
					Delete
				</button>
			</div>

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

			<!-- how to move the contents of addItem to a method? where to put it? -->
			<modal-addItem
				v-bind="item"
				v-if="showNewModal"
				@close="setNewModalVisibility(false);"
				@nameChange="nameChange"
				@summaryChange="summaryChange"
				@addItem="dispatchItem(this.item.name, this.item.summary); setNewModalVisibility(false); clearData();">
			</modal-addItem>

			<!-- NEW MODAL -->
			<!-- <modal
				v-if="showNewModal"
				@close="clearData(); setNewModalVisibility(false);">
				<template #title>
					{{ editMode ? "Edit item" : "Add item" }}
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
						@click="() => {
							if (!editMode) {
								dispatchItem(name, summary); clearData(); clearSelections();
							} else {
								updateItem(checkedItems[0].id, name, summary); clearData();
							}
						}">
						{{ editMode ? "Edit" : "Add" }}
					</button>
					<button class="button" @click="clearData(); setNewModalVisibility(false);">Close</button>
				</template>
			</modal> -->

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
						@click="deleteItems(getDeletableItemIds()); clearData(); clearSelections();">
						Delete
					</button>
					<button class="button" @click="clearData(); setDeleteModalVisibility(false);">Close</button>
				</template>
			</modal>
		</main>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from 'src/vue-setup';
import Item from './components/item.vue';
import Modal from './components/modal.vue';
import ModalAddItem from './components/modal-addItem.vue';

/* scaffolding-enable */
export default defineComponent({
	/* scaffolding-disable unless keepExamples */
	components: {
		Item,
		ModalAddItem, 
		Modal,
	},
	setup(props) {
		const { state, dispatch } = useStore();
		return {
			items: computed(() => state.items),
			showNewModal: computed(() => state.showNewModal),
			showDeleteModal: computed(() => state.showDeleteModal),
			dispatchItem: (name: string, summary: string) => {
				dispatch('addNewItem', { name, summary });
			},
			updateItem: (id: number, name: string, summary: string) => {
				dispatch('updateItem', { id, name, summary });
			},
			deleteItems: (ids: number[]) => {
				dispatch('deleteItems', ids);
			},
			setNewModalVisibility: (value: boolean) => {
				dispatch('setNewModalVisibility', value);
			},
			setDeleteModalVisibility: (value: boolean) => {
				dispatch('setDeleteModalVisibility', value);
			},
		};
	},
	data() {
		return {
			editMode: false,
			item: {
				name: '',
				summary: '',
			},

			checkedItems: [] as {id: number; name: string; summary: string}[],
		};
	},
	computed: {
		console: () => console,
		window: () => window,
	},
	methods: {
		nameChange(value: string) {
			this.item.name = value;
		},
		summaryChange(value: string) {
			this.item.summary = value;
		},
		listItemInfo(item: any) { return `${item.id} - ${item.name} , ${item.summary}`; },
		clearData() {
			this.item.name = '';
			this.item.summary = '';
			this.editMode = false;
			return ;
		},
		prefillModal() {
			this.item.name = this.checkedItems[0].name;
			this.item.summary = this.checkedItems[0].summary;
			this.editMode = true;
		},
		getDeletableItemIds() {
			let toDelete: number[] = [];
			for (let i=0; i<this.checkedItems.length; i++) {
				toDelete.push(this.checkedItems[i].id);
			}
			return toDelete;
		},
		clearSelections() {
			this.checkedItems = [];
		}
	},
});
/* scaffolding-disable unless keepExamples */

</script>
