import { ref, inject, InjectionKey, provide } from 'vue';
import { List } from 'src/domain';
import { Api } from 'src/api';
import { Console } from 'console';
type AssetListsStore = ReturnType<typeof setupAssetListsStore>
export const AssetListsStoreSymbol: InjectionKey<AssetListsStore> = Symbol('assetListsStore');

type storeDeps = {
	api: Api
}

export const setupAssetListsStore = ({ api }: storeDeps) => {
	const lists = ref<List[]>();
	const { getListsCall, getListCall, postListCall, editListCall, deleteListCall } = api;

	const listNameInput = ref("");

	const saveNewList = (title: string) => {
		return postListToApi(List({ title }));
	};

	const resetInputValue = () =>{
		listNameInput.value = "";
	}

    const getListsFromApi = async() => {
		const data = await getListsCall();
		lists.value = data;
	};

	const getListFromApi = async(id: number) => {
		const data = await getListCall(id);
		return data;
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
		listNameInput,
		saveNewList,
		resetInputValue,
		getListsFromApi,
		getListFromApi,
		postListToApi,
		putListToApi,
		deleteList
	};
};

export const provideAssetListsStore = (storeDeps: storeDeps) => {
	const assetListStore = setupAssetListsStore(storeDeps);
	provide(AssetListsStoreSymbol, assetListStore);
	return assetListStore;
};

export const useAssetListsStore = () => {
	return inject(AssetListsStoreSymbol)!;
};
