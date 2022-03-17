import { Item, List } from 'src/domain';
import { Api } from 'src/api';
import { inject, InjectionKey, provide, Ref, ref } from 'vue';
import { setupListBaseStore } from 'src/store/general.store';

type AssetListStore = ReturnType<typeof setupListStore>
export const AssetListStoreSymbol: InjectionKey<AssetListStore> = Symbol('assetListStore');

type storeDeps = {
	api: Api,
	id: Ref<number>,
	title: Ref<string>,
	refreshList: Function,
}

export const setupListStore = ({ api, id, title, refreshList }: storeDeps) => {
	const { items, SelectableItem, deleteSelectedItems, ...rest } = setupListBaseStore<Item>();
	const { editListCall } = api;

	const updateItemToStore = (item: Item) => {
		items.value = items.value.map(element => {
			if(element.id === item.id){
				element.name = item.name;
				element.summary = item.summary;
			}
			return element;
		} );
	};

	const updateItem = async (item: Item) => {
		updateItemToStore(item);
		await editListCall(List({title: title.value, id: id.value, items: items.value}));
	}

	const addItemToStore = (item: Item) => {
		items.value.push(SelectableItem(item));
	};

	const addItem = async (item: Item) => {
		addItemToStore(item);
		await editListCall(List({title: title.value, id: id.value, items: items.value}));
	}

	const deleteItems = async () => {
		deleteSelectedItems();
		await editListCall(List({title: title.value, id: id.value, items: items.value}));
	}

	return {
		items,
		updateItem,
		deleteItems,
		addItem,
		...rest,
	};
};

export const provideAssetListStore = (storeDeps: storeDeps) => {
	const assetListStore = setupListStore(storeDeps);
	provide(AssetListStoreSymbol, assetListStore);
	return assetListStore;
};

export const useAssetListStore = () => {
	return inject(AssetListStoreSymbol)!;
};
