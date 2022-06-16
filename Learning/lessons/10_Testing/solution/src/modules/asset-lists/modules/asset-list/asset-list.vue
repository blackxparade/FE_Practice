<template>
	<div class="page container" style="margin-top: 3rem;">

			<!-- ASSET LIST HEADER -->
			<asset-list-header :id="id" :title="title" :list="list" />

			<!-- EDIT LIST MODAL -->
			<modal-editList />

			<!-- ACTION BUTTONS AND MODALS -->
			<div style="display: flex; gap: .5rem; margin-top: 3rem;">
				<modal-newItem />
				<modal-editItem :isDisabled="getEverySelected.length !== 1" />
				<modal-deleteItem :isDisabled="getEverySelected.length === 0"/>
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
						<list-item v-bind="item" style="cursor: pointer;" data-testid="asset-list-item"/>
					</label>
				</div>
			</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs } from 'vue';
import { provideModalStore } from './modal.store';
import { provideAssetListStore } from './asset-list.store';
import { provideNewItemModalStore, ModalNewItem } from './modules/modal-newItem';
import { provideDeleteItemModalStore, ModalDeleteItem } from './modules/modal-deleteItem';
import { provideEditItemModalStore, ModalEditItem } from './modules/modal-editItem';
import { provideEditListModalStore, ModalEditList } from './modules/modal-editList';
import { AssetListHeader } from './modules/asset-list-header'
import { useAssetListsStore } from '../../asset-lists.store';
import ListItem from 'src/components/list-item.vue';
import { List } from 'src/domain';
import { useApi } from 'src/api';

/* scaffolding-enable */
export default defineComponent({
	/* scaffolding-disable unless keepExamples */
	components: {
		ListItem,
		ModalNewItem,
		ModalDeleteItem,
		ModalEditItem,
		ModalEditList,
		AssetListHeader
	},

	props: {
		id: { type: Number, default: 0 },
		title: { type: String, default: "" },
		refreshList: { type: Function, required: true }
	},

	setup(props) {
		const api = useApi();
		const { getListFromApi, putListToApi } = useAssetListsStore();
		const list = ref<List>();
		const getListData = async() => {
			list.value = await getListFromApi(props.id);
			setItems(list.value.items);
			return list;
		};
		const { id, title } = toRefs(props);
		
		const { items, setItems, deleteList, getEverySelected, getSelected, addItem, deleteItems, updateItem, ...others } = provideAssetListStore({ api, id, title, refreshList: props.refreshList });
		const { openNewModal } = provideNewItemModalStore({ addItem });
		const { openDeleteModal } = provideDeleteItemModalStore({ deleteItems, getEverySelected });
		const { openEditModal } = provideEditItemModalStore({ updateItem, getSelected });
		const { openEditListModal } = provideEditListModalStore({ putListToApi, getListData });
		const { ...rest } = provideModalStore({ api });
		return {
			...rest,
			...others,
			openNewModal,
			openDeleteModal,
			openEditModal,
			openEditListModal,
			getEverySelected,
			items,
			id,
			title,
			list,
			getListData,
			deleteList
		};
	},

	created() {
		this.getListData();
  	}
});
/* scaffolding-disable unless keepExamples */

</script>
