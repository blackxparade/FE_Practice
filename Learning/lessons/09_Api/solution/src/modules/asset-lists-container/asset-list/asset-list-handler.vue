<template>
	<div class="page container" style="margin-top: 3rem;">

			<div style="display: flex; gap: 1rem;" >
				<h3 class="title is-3">{{ title }}</h3>
				<button class="button is-small is-light" @click="openEditListModal()">Edit title</button>
			</div>

			<!-- ACTION BUTTONS -->
			<div style="display: flex; gap: .5rem; margin-top: 1rem;">
				<button
					class="button is-primary is-light"
					@click="openNewModal">
					Add item
				</button>
				<button
					class="button is-light"
					:disabled="getEverySelected.length !== 1"
					@click="openEditModal">
					Edit
				</button>
				<button
					class="button is-danger is-light"
					:disabled="getEverySelected.length === 0"
					@click="openDeleteModal">
					Delete
				</button>
			</div>

			<!-- ASSET ITEM LIST -->
			<div style="display: flex; flex-direction: column; gap: 1rem; margin-top: 1rem;">
				<div v-for="item in items" :key="item.id" style="display: flex; align-content: center; gap: .75rem;">
					<input
						:id="item.id"
						type="checkbox"
						:value="item.isSelected"
						@click="setItemSelectionById(item.id, $event.target.checked)"
						style="margin-top: 1rem;">
					<label :for="item.id">
						<list-item v-bind="item" style="cursor: pointer;" />
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

			<modal-editList
			v-bind="{id: id, title: title}" 
			v-if="showEditListModal" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { provideModalStore } from './modal.store';
import { provideAssetListStore } from './asset-list.store';
import ListItem from 'src/components/list-item.vue';
import { Item } from 'src/domain';
import ModalEditItem from './modal-editItem.vue';
import ModalNewItem from './modal-newItem.vue';
import ModalDeleteItem from './modal-deleteItem.vue';
import ModalEditList from '../modal-editList.vue';

/* scaffolding-enable */
export default defineComponent({
	/* scaffolding-disable unless keepExamples */
	components: {
		ListItem,
		ModalEditItem,
		ModalNewItem,
		ModalDeleteItem,
		ModalEditList
	},

	props: {
		id: { type: Number, default: 0 },
		title: { type: String, default: '' }
	},

	setup(props) {
		const { ...rest } = provideModalStore();
		const { items, setItems, getEverySelected, setItemSelectionById } = provideAssetListStore();
		const sampleItems = [
			Item({ name: 'item1', summary: 'summary1' }),
			Item({ name: 'item2', summary: 'summary2' }),
			Item({ name: 'item3', summary: 'summary3' }),
			Item({ name: 'item4', summary: 'summary4' }),
			Item({ name: 'item5', summary: 'summary5' }),
		];
		setItems(sampleItems);
		return {
			...rest,
			getEverySelected,
			setItemSelectionById,
			items,
		};
	},
});
/* scaffolding-disable unless keepExamples */

</script>
