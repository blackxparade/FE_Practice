import { Item } from 'src/domain';
import { ref, inject, InjectionKey, provide } from 'vue';
type ModalStore = ReturnType<typeof setupNewItemModalStore>
export const ModalStoreSymbol: InjectionKey<ModalStore> = Symbol('modalStore');

type storeDeps = {
	addItem: (item: Item) => Promise<void>
	id: number,
	title: string
}

export const setupNewItemModalStore = ({ addItem, id, title }: storeDeps) => {
	const showNewModal = ref(false);

	const closeNewModal = () => {
		showNewModal.value = false;
	};

	const openNewModal = () => {
		showNewModal.value = true;
	};

	return {
		showNewModal,
		closeNewModal,
		openNewModal,
		addItem,
		id,
		title
	};
};

export const provideNewItemModalStore = (storeDeps: storeDeps) => {
	const modalStore = setupNewItemModalStore(storeDeps);
	provide(ModalStoreSymbol, modalStore);
	return modalStore;
};

export const useNewItemModalStore = () => {
	return inject(ModalStoreSymbol)!;
};
