<template>
	<div class="page container">
		<main class="main section">
			<div style="display: flex; gap: .5rem;">
				<button class="button is-primary is-light" @click="showNewModal = true;">Add item</button>
				<button 
					class="button is-light"
					@click="prefillModal"
					:disabled="checkedItems.length !== 1">
					Edit
				</button>
				<button 
					class="button is-danger is-light" 
					@click="showDeleteModal = true;"
					:disabled="checkedItems.length === 0">
					Delete
				</button>
			</div>

			<div style="display: flex; flex-direction: column; gap: 1rem; margin-top: 1rem;">
				<div v-for="item in items" :key="item.id" style="display: flex; align-content: center; gap: .75rem;">
					<input type="checkbox" :id="item.id" :value="item" v-model="checkedItems" style="margin-top: 1rem;">
					<label :for="item.id">
						<item v-bind="item" style="cursor: pointer;"/>
					</label>
				</div>
			</div>

			<modal
				v-if="showNewModal"
				@close="clearData()">
				<template #title>
					{{ editMode ? "Edit item" : "Add item"}}
				</template>
				<template #content>
					<input 
						class="input mb-4" 
						type="text" 
						placeholder="Name" 
						v-model="name">
					<input 
						class="input" 
						type="text" 
						placeholder="Summary" 
						v-model="summary">
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
					<button class="button" @click="clearData()">Close</button>
				</template>
			</modal>

			<modal
				v-if="showDeleteModal"
				@close="clearData()">
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
					<button class="button" @click="clearData()">Close</button>
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

/* scaffolding-enable */
export default defineComponent({
	/* scaffolding-disable unless keepExamples */
	components: {
		Item,
		Modal,
	},
	setup(props) {
		const { state, dispatch } = useStore();
		return {
			items: computed(() => state.items),
			dispatchItem: (name: string, summary: string) => {
				dispatch('addNewItem', { name, summary });
			},
			updateItem: (id: number, name: string, summary: string) => {
				dispatch('updateItem', { id, name, summary });
			},
			deleteItems: (ids: number[]) => {
				dispatch('deleteItems', ids);
			},
		};
	},
	data() {
		return {
			showNewModal: false,
			showDeleteModal: false,
			editMode: false,
			name: '',
			summary: '',
			// string, number, boolean, etc. types with capital or not??? which is the correct form?
			checkedItems: [] as {id: number, name: string, summary: string}[],
		};
	},
	methods: {
		listItemInfo(item: any) { return `${item.id} - ${item.name} , ${item.summary}`; },
		clearData() {
			this.name = '';
			this.summary = '';
			this.showNewModal = false;
			this.showDeleteModal = false;
			this.editMode = false;
			return ;
		},
		prefillModal() {
			this.name = this.checkedItems[0].name;
			this.summary = this.checkedItems[0].summary;
			this.showNewModal = true;
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
	computed: {
		console: () => console,
		window: () => window,
	},
});
/* scaffolding-disable unless keepExamples */

</script>
