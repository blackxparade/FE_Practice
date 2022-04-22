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

	return {
		showNewModal,
		closeNewModal,
		openNewModal,
		addItem,
		name,
		summary,
		clearData
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
