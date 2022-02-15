import { Item } from 'src/domain';
import { inject, InjectionKey, provide } from 'vue';
import { setupListBaseStore } from 'src/store/general.store';
type AssetListStore = ReturnType<typeof setupListStore>
export const AssetListStoreSymbol: InjectionKey<AssetListStore> = Symbol('assetListStore');


export const setupListStore = () => {
	const { items, ...rest } = setupListBaseStore<Item>();
	
	const updateItem = (item: Item) => {
		items.value = items.value.map(element => {
			if(element.id === item.id){
				element.name = item.name;
				element.summary = item.summary;
			}
			return element;
		} ) as any;
	};

	return {
		items,
		updateItem,
		...rest,
	};
};

export const provideAssetListStore = () => {
	const assetListStore = setupListStore();
	provide(AssetListStoreSymbol, assetListStore);
	return assetListStore;
};

export const useAssetListStore = () => {
	return inject(AssetListStoreSymbol)!;
};