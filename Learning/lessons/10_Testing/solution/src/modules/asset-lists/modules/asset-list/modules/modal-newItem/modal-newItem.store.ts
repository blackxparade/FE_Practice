import { Item } from 'src/domain';
import { ref, inject, InjectionKey, provide } from 'vue';
type ModalStore = ReturnType<typeof setupNewItemModalStore>
export const ModalStoreSymbol: InjectionKey<ModalStore> = Symbol('modalStore');

type storeDeps = {
	addItem: (item: Item) => Promise<void>
}

export const setupNewItemModalStore = ({ addItem }: storeDeps) => {
	const showNewModal = ref(false);
	const name = ref("");
	const summary = ref("");

	const closeNewModal = () => {
		showNewModal.value = false;
	};

	const openNewModal = () => {
		showNewModal.value = true;
	};

	const clearData = () => {
		name.value = "";
		summary.value = "";
	};

	const addItemHandler = (name: string, summary: string) => {
		addItem(Item({ name, summary }));
		closeNewModal();
		clearData();
	};

	const clearCloseNewModal = () => {
		closeNewModal();
		clearData();
	};

	return {
		showNewModal,
		closeNewModal,
		openNewModal,
		addItem,
		name,
		summary,
		clearCloseNewModal,
		addItemHandler
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
