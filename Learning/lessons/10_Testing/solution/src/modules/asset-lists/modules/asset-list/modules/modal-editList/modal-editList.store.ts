import { List, Item } from 'src/domain';
import { ref, Ref, inject, InjectionKey, provide } from 'vue';
type ModalStore = ReturnType<typeof setupEditListModalStore>
export const ModalStoreSymbol: InjectionKey<ModalStore> = Symbol('modalStore');

type storeDeps = {
	putListToApi: (list: List) => Promise<void>,
	getListData: () => Promise<Ref<List | undefined>>
}

export const setupEditListModalStore = ({ putListToApi, getListData }: storeDeps) => {
	const showEditListModal = ref(false);
	const listTitle = ref('');
	let tempList:List | undefined = undefined;

	const closeEditListModal = () => {
		showEditListModal.value = false;
	};

	const openEditListModal = (list: List | undefined) => {
		if(list === undefined) return;
		tempList = list,
		listTitle.value = list.title,
		showEditListModal.value = true;
	};

	const sendTitleToApiAndClose = async (listTitle: string) => {
		await putListToApi({...tempList!, title: listTitle});
		getListData();
		closeEditListModal();
	};

	return {
		showEditListModal,
		closeEditListModal,
		openEditListModal,
		sendTitleToApiAndClose,
		listTitle,
	};
};

export const provideEditListModalStore = (storeDeps: storeDeps) => {
	const modalStore = setupEditListModalStore(storeDeps);
	provide(ModalStoreSymbol, modalStore);
	return modalStore;
};

export const useEditListModalStore = () => {
	return inject(ModalStoreSymbol)!;
};
