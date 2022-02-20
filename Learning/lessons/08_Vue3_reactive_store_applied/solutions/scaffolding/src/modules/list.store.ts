import { Item } from 'src/domain';
import { setupListBaseStore } from 'src/store/list.store';
import { Ref } from 'vue';


type storeApi = {
	isMultiSelect: Ref<boolean>;
}

export const setupListStore = ({ isMultiSelect }: storeApi) => {
	const { getSelected, setItems, ...rest } = setupListBaseStore<Item>();


	const listId = Math.floor(Math.random() * 100);
	const isDisabled = (id: number) => {
		if(isMultiSelect.value){
			return false;
		}
		if(!getSelected.value){
			return false;
		}
		if(getSelected.value && getSelected.value.id === id){
			return false;
		}
		return true;
	};

	return {
		listId,
		isDisabled,
		setItems,
		...rest,
	};
};
