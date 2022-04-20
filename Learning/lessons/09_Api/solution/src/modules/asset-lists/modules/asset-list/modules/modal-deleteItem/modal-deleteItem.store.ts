import { Item } from 'src/domain';
import { ref, inject, InjectionKey, provide, ComputedRef } from 'vue';
type ModalStore = ReturnType<typeof setupDeleteItemModalStore>
export const ModalStoreSymbol: InjectionKey<ModalStore> = Symbol('modalStore');

type storeDeps = {
	deleteItems: () => Promise<void>,
	getEverySelected: ComputedRef<{ id: number, name: string, summary: string, isSelected: boolean }[]>,
	id: number,
	title: string
}

export const setupDeleteItemModalStore = ({ deleteItems, getEverySelected, id, title }: storeDeps) => {
	const showDeleteModal = ref(false);

	const closeDeleteModal = () => {
		showDeleteModal.value = false;
	};

	const openDeleteModal = () => {
		showDeleteModal.value = true;
	};

	return {
		showDeleteModal,
		closeDeleteModal,
		openDeleteModal,
		deleteItems,
		getEverySelected,
		id,
		title
	};
};

export const provideDeleteItemModalStore = (storeDeps: storeDeps) => {
	const modalStore = setupDeleteItemModalStore(storeDeps);
	provide(ModalStoreSymbol, modalStore);
	return modalStore;
};

export const useDeleteItemModalStore = () => {
	return inject(ModalStoreSymbol)!;
};
