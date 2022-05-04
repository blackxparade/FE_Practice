import { Item } from 'src/domain';
import { ref, inject, InjectionKey, provide, ComputedRef } from 'vue';
type ModalStore = ReturnType<typeof setupDeleteItemModalStore>
export const ModalStoreSymbol: InjectionKey<ModalStore> = Symbol('modalStore');

type storeDeps = {
	deleteItems: () => Promise<void>,
	getEverySelected: ComputedRef<{ id: number, name: string, summary: string, isSelected: boolean }[]>
}

export const setupDeleteItemModalStore = ({ deleteItems, getEverySelected }: storeDeps) => {
	const showDeleteModal = ref(false);

	const closeDeleteModal = () => {
		showDeleteModal.value = false;
	};

	const openDeleteModal = () => {
		showDeleteModal.value = true;
	};

	const listItemInfo = (item: any) => {
		return `${item.id} - ${item.name}, ${item.summary}`;
	};

	const deleteAndClose = () => {
		deleteItems();
		closeDeleteModal();
	};

	return {
		deleteAndClose,
		listItemInfo,
		showDeleteModal,
		closeDeleteModal,
		openDeleteModal,
		deleteItems,
		getEverySelected
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
