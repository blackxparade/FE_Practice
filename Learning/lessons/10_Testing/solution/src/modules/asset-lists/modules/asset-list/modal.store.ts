import { ref, inject, InjectionKey, provide } from 'vue';
import { Api } from 'src/api';
import { Item, List } from 'src/domain';
type ModalStore = ReturnType<typeof setupModalStore>
export const ModalStoreSymbol: InjectionKey<ModalStore> = Symbol('modalStore');

type storeDeps = {
	api: Api
}

export const setupModalStore = ({ api }: storeDeps) => {
	const showEditModal = ref(false);
	const showDeleteModal = ref(false);
	const showEditListModal = ref(false);

	const setEditModalVisibility = (value: boolean) => {
		showEditModal.value = value;
	};

	const setEditListModalVisibility = (value: boolean) => {
		showEditListModal.value = value;
	};

	const setDeleteModalVisibility = (value: boolean) => {
		showDeleteModal.value = value;
	};

	const openEditModal = () => {
		setEditModalVisibility(true);
	};
	const openEditListModal = () => {
		setEditListModalVisibility(true);
	};
	const openDeleteModal = () => {
		setDeleteModalVisibility(true);
	};
	return {
		showEditModal,
		showDeleteModal,
		showEditListModal,
		setEditModalVisibility,
		setEditListModalVisibility,
		setDeleteModalVisibility,
		openEditModal,
		openEditListModal,
		openDeleteModal,
	};
};

export const provideModalStore = (storeDeps: storeDeps) => {
	const modalStore = setupModalStore(storeDeps);
	provide(ModalStoreSymbol, modalStore);
	return modalStore;
};

export const useModalStore = () => {
	return inject(ModalStoreSymbol)!;
};
