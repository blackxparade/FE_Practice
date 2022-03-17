<template>
	<div class="page container" style="margin-top: 3rem;">

			<div style="display: flex; flex-direction: column; gap: 1rem;" >
				<h3 class="title is-3" style="margin-bottom: 0;"></h3>
				<div class="div" style="display: flex; gap: .5rem;">
					<button class="button is-small is-light" @click="openEditListModal()">Edit title</button>
					<button class="button is-small is-light is-danger" @click="deleteList(id)">Delete list</button>
				</div>
			</div>

			<!-- ACTION BUTTONS -->
			<div style="display: flex; gap: .5rem; margin-top: 3rem;">
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
			v-if="showNewModal"
			:id="id"
			:title="title">
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
			v-if="showEditListModal"
			@sentTitle="this.getListData()"/>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs } from 'vue';
import { provideModalStore } from './modal.store';
import { provideAssetListStore } from './asset-list.store';
import { useAssetListsStore } from '../../asset-lists.store';
import ListItem from 'src/components/list-item.vue';
import { List } from 'src/domain';
import ModalEditItem from './modal-editItem.vue';
import ModalNewItem from './modal-newItem.vue';
import ModalDeleteItem from './modal-deleteItem.vue';
import ModalEditList from './modal-editList.vue';
import { useApi } from 'src/api';

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
		title: { type: String, default: "" },
		refreshList: { type: Function, required: true }
	},

	setup(props) {
		const api = useApi();
		const { ...rest } = provideModalStore();
		const { deleteList, getListFromApi } = useAssetListsStore();
		const list = ref<List>();
		const getListData = async() => {
			list.value = await getListFromApi(props.id);
			setItems(list.value.items);
			return list;
		};
		const { id, title } = toRefs(props);
		const { items, setItems, getEverySelected, setItemSelectionById } = provideAssetListStore({ api, id, title, refreshList: props.refreshList });
		return {
			...rest,
			getEverySelected,
			setItemSelectionById,
			items,
			setItems,
			id,
			title,
			getListData,
			deleteList,
		};
	},

	created() {
		this.getListData();
  	}
});
/* scaffolding-disable unless keepExamples */

</script>
