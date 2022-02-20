import { ref, Ref, inject, InjectionKey, provide } from 'vue';
import { List } from 'src/domain';
import { Api } from 'src/api';
type AssetListsStore = ReturnType<typeof setupAssetListsStore>
export const AssetListStoreSymbol: InjectionKey<AssetListsStore> = Symbol('assetListsStore');

export const setupAssetListsStore = () => {
	const lists = ref([] as List[]);
	const { getListsCall, postListCall, editListCall } = Api();

    const getListsFromApi = async() => {
		const data = await getListsCall();
		lists.value = data as List[];
	};

	const getLists = (): Ref<List[]> => {
		getListsFromApi()
		return lists;
	};

	const postListToApi = async(list: List) => {
		await postListCall(list);
		getListsFromApi();
	};

	const putListToApi = async(list: List) => {
		await editListCall(list);
		getListsFromApi();
	};
	
	return {
		getLists,
		postListToApi,
		putListToApi
	};
};

export const provideAssetListsStore = () => {
	const assetListStore = setupAssetListsStore();
	provide(AssetListStoreSymbol, assetListStore);
	return assetListStore;
};

export const useAssetListsStore = () => {
	return inject(AssetListStoreSymbol)!;
};
