// import { Item } from 'src/domain';
// import { setupListBaseStore } from 'src/store/general.store';
import { ref, inject, InjectionKey, provide } from 'vue';
type ModalStore = ReturnType<typeof setupModalStore>
export const ModalStoreSymbol: InjectionKey<ModalStore> = Symbol('modalStore');


// type modalApi = {
// 	showNewModal: Ref<boolean>,
// 	showEditModal: Ref<boolean>,
// 	showDeleteModal: Ref<boolean>
// }

export const setupModalStore = () => {
	//const { getSelected, setItems, ...rest } = setupListBaseStore<Item>();
	const showNewModal = ref(false);
	const showEditModal = ref(false);
	const showDeleteModal = ref(false);

	// const listId = Math.floor(Math.random() * 100);
	// const isDisabled = (id: number) => {
	// 	if(isMultiSelect.value){
	// 		return false;
	// 	}
	// 	if(!getSelected.value){
	// 		return false;
	// 	}
	// 	if(getSelected.value && getSelected.value.id === id){
	// 		return false;
	// 	}
	// 	return true;
	// };

	const setNewModalVisibility = (value: boolean) => {
		showNewModal.value = value;
	};

	const setEditModalVisibility = (value: boolean) => {
		showEditModal.value = value;
	};

	const setDeleteModalVisibility = (value: boolean) => {
		showDeleteModal.value = value;
	};


	return {
		showNewModal,
		showEditModal,
		showDeleteModal,
		setNewModalVisibility,
		setEditModalVisibility,
		setDeleteModalVisibility
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
