import { ref, inject, InjectionKey, provide } from 'vue';
type ModalStore = ReturnType<typeof setupModalStore>
export const ModalStoreSymbol: InjectionKey<ModalStore> = Symbol('modalStore');

export const setupModalStore = () => {
	const showNewModal = ref(false);
	const showEditModal = ref(false);
	const showDeleteModal = ref(false);
	const showEditListModal = ref(false);

	const setNewModalVisibility = (value: boolean) => {
		showNewModal.value = value;
	};

	const setEditModalVisibility = (value: boolean) => {
		showEditModal.value = value;
	};

	const setEditListModalVisibility = (value: boolean) => {
		showEditListModal.value = value;
	};

	const setDeleteModalVisibility = (value: boolean) => {
		showDeleteModal.value = value;
	};

	const openNewModal = () => {
		setNewModalVisibility(true);
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
		showNewModal,
		showEditModal,
		showDeleteModal,
		showEditListModal,
		setNewModalVisibility,
		setEditModalVisibility,
		setEditListModalVisibility,
		setDeleteModalVisibility,
		openNewModal,
		openEditModal,
		openEditListModal,
		openDeleteModal,
	};
};

export const provideModalStore = () => {
	const modalStore = setupModalStore();
	provide(ModalStoreSymbol, modalStore);
	return modalStore;
};

export const useModalStore = () => {
	return inject(ModalStoreSymbol)!;
};
