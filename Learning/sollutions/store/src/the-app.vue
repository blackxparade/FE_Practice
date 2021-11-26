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
				Delete</button>
			</div>

			<div style="display: flex; flex-direction: column; gap: 1rem; margin-top: 1rem;">
				<!-- question: how to uncheck every item from this parent component? -->
				<item
					v-for="item in items"
					:key="item.id"
					v-bind="item"
					@checkedItem="addChecked" />
			</div>

			<modal
				v-if="showNewModal"
				@nameChange="(value) => { name = value }"
				@summaryChange="(value) => { summary = value }"
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
									dispatchItem(name, summary); clearData();
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
							{{ item.id + " - " + item.name + ", " + item.summary}}
						</li>
					</ul>
				</template>
				<template #footer>
					<button
						class="button">
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
				dispatch('addNewItem', { name: name, summary: summary });
			},
			updateItem: (id: number, name: string, summary: string) => {
				dispatch('updateItem', {id: id, name: name, summary: summary});
			}
		};
	},
	data() {
		return {
			showNewModal: false,
			showDeleteModal: false,
			editMode: false,
			name: '',
			summary: '',
			checkedItems: [] as {id: Number, name: string, summary: string}[],
		};
	},
	methods: {
		clearData() {
			this.name = '';
			this.summary = '';
			this.showNewModal = false;
			this.showDeleteModal = false;
			this.editMode = false;
			return ;
		},
		// i had to add this method, because i could not make a condition to only emit checked state
		addChecked(value: {checked: Boolean, id: number, name: string, summary: string}) { 
			const {checked, id, name, summary} = value;
			// put the element in checkedItems if it is checked
			if (checked) {
				this.checkedItems = [...this.checkedItems, {id, name, summary}]
			// filter out element if it became unchecked
			} else {
				this.checkedItems = this.checkedItems.filter(element => element.id !== id);
			}
		},
		prefillModal() {
			this.name = this.checkedItems[0].name;
			this.summary = this.checkedItems[0].summary;
			this.showNewModal = true;
			this.editMode = true;
		}
	},
	computed: {
		console: () => console,
		window: () => window,
	},
});
/* scaffolding-disable unless keepExamples */

</script>
