import { List, Item } from 'src/domain';
import { ref, Ref, inject, InjectionKey, provide } from 'vue';
type ModalStore = ReturnType<typeof setupEditListModalStore>
export const ModalStoreSymbol: InjectionKey<ModalStore> = Symbol('modalStore');

type storeDeps = {
	putListToApi: (list: List) => Promise<void>,
	list: Ref<List | undefined>,
	getListData: () => Promise<Ref<List | undefined>>
}

export const setupEditListModalStore = ({ putListToApi, list, getListData }: storeDeps) => {
	const showEditListModal = ref(false);
	const listTitle = ref(list.value!.title);

	const closeEditListModal = () => {
		showEditListModal.value = false;
	};

	const openEditListModal = () => {
		showEditListModal.value = true;
	};

	const sendTitleToApiAndClose = async (listTitle: string) => {
		await putListToApi({...list.value!, title: listTitle});
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
