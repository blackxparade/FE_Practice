import { ref, inject, InjectionKey, provide } from 'vue';
import { List } from 'src/domain';
import { Api } from 'src/api';
type AssetListsStore = ReturnType<typeof setupAssetListsStore>
export const AssetListStoreSymbol: InjectionKey<AssetListsStore> = Symbol('assetListsStore');

type storeDeps = {
	api: Api
}

export const setupAssetListsStore = ({ api }: storeDeps) => {
	const lists = ref<List[]>();
	const { getListsCall, postListCall, editListCall, deleteListCall } = api;

    const getListsFromApi = async() => {
		const data = await getListsCall();
		lists.value = data;
	};

	const postListToApi = async(list: List) => {
		await postListCall(list);
		getListsFromApi();
	};

	const putListToApi = async(list: List) => {
		await editListCall(list);
		getListsFromApi();
	};

	const deleteList = async(id: number) => {
		await deleteListCall(id);
		getListsFromApi(); 
	}

	return {
		lists,
		getListsFromApi,
		postListToApi,
		putListToApi,
		deleteList
	};
};

export const provideAssetListsStore = (storDeps: storeDeps) => {
	const assetListStore = setupAssetListsStore(storDeps);
	provide(AssetListStoreSymbol, assetListStore);
	return assetListStore;
};

export const useAssetListsStore = () => {
	return inject(AssetListStoreSymbol)!;
};
