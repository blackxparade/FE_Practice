import { List, Item } from 'src/domain';
import { ref, Ref, inject, InjectionKey, provide } from 'vue';
type ModalStore = ReturnType<typeof setupEditListModalStore>
export const ModalStoreSymbol: InjectionKey<ModalStore> = Symbol('modalStore');

type storeDeps = {
	putListToApi: (list: List) => Promise<void>,
	lists: Ref<List[] | undefined>,
}

export const setupEditListModalStore = ({ putListToApi, lists }: storeDeps) => {
	const showEditListModal = ref(false);
	const list = ref(List({title: ""}));

	const closeEditListModal = () => {
		showEditListModal.value = false;
	};

	const openEditListModal = () => {
		showEditListModal.value = true;
	};

	const sendTitleToApiAndClose = (list: List) => {		
		putListToApi({id: list.id, title: list.title, items: list.items});
		closeEditListModal();
	};

	return {
		showEditListModal,
		closeEditListModal,
		openEditListModal,
		sendTitleToApiAndClose,
		lists,
		list,
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
