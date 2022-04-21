import { Item } from 'src/domain';
import { ref, inject, InjectionKey, provide, ComputedRef } from 'vue';
type ModalStore = ReturnType<typeof setupEditItemModalStore>
export const ModalStoreSymbol: InjectionKey<ModalStore> = Symbol('modalStore');

type storeDeps = {
	updateItem: (item: Item) => Promise<void>,
	getSelected: ComputedRef<{id: number, name: string, summary: string, isSelected: boolean } | undefined>,
	id: number,
	title: string
}

export const setupEditItemModalStore = ({ updateItem, getSelected, id, title }: storeDeps) => {
	const showEditModal = ref(false);
	const item = ref(Item({name: "", summary: ""}));

	const closeEditModal = () => {
		showEditModal.value = false;
	};

	const openEditModal = () => {
		showEditModal.value = true;
		const tempitem = getSelected.value ?? item.value;
		item.value = tempitem!;
	};

	return {
		showEditModal,
		closeEditModal,
		openEditModal,
		updateItem,
		getSelected,
		item,
		id,
		title
	};
};

export const provideEditItemModalStore = (storeDeps: storeDeps) => {
	const modalStore = setupEditItemModalStore(storeDeps);
	provide(ModalStoreSymbol, modalStore);
	return modalStore;
};

export const useEditItemModalStore = () => {
	return inject(ModalStoreSymbol)!;
};
