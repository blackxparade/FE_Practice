import { List } from 'src/domain';
import { ref, Ref, inject, InjectionKey, provide } from 'vue';
type ModalStore = ReturnType<typeof setupEditListModalStore>
export const ModalStoreSymbol: InjectionKey<ModalStore> = Symbol('modalStore');

type storeDeps = {
	putListToApi: (list: List) => Promise<void>,
	lists: Ref<List[] | undefined>,
}

export const setupEditListModalStore = ({ putListToApi, lists }: storeDeps) => {
	const showEditListModal = ref(false);

	const closeEditListModal = () => {
		showEditListModal.value = false;
	};

	const openEditListModal = () => {
		showEditListModal.value = true;
	};

	return {
		showEditListModal,
		closeEditListModal,
		openEditListModal,
		putListToApi,
		lists,
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
