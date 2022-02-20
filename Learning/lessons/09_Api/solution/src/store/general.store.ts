import { computed, ref } from 'vue';

type Selectable = {
	id: number;
	isSelected: boolean;
};

export const setupListBaseStore = <T>() => {

	type SelectableItem = T & Selectable;
	type SelectableItemOption = T & Pick<Selectable, 'id'>;

	function SelectableItem(item: SelectableItemOption): SelectableItem {
		return {
			...item,
			isSelected: false,
		};
	}

	const items = ref<SelectableItem[]>([]);

	/* Getters */

	const isEmpty = computed(() => {
		return items.value.length === 0 ? true : false;
	});

	const isAllSelected = computed(() => {
		const notSelected = items.value.filter(element => element.isSelected === false);
		return notSelected.length === 0 ? true : false;
	});

	const isMultipleSelected = computed(() => {
		const selected = items.value.filter(element => element.isSelected === true);
		return selected.length > 1 ? true : false;
	});

	const getSelected = computed(() => {
		const selected = items.value.filter(element => element.isSelected === true);
		return selected.length > 0 ? selected[0] : undefined;
	});

	const getEverySelected = computed(() => {
		const selected = items.value.filter(element => element.isSelected === true);
		return selected;
	});

	/* Actions */

	const selectAll = () => {
		items.value.forEach(element => element.isSelected = true);
	};

	const deselectAll = () => {
		items.value.forEach(element => element.isSelected = false);
	};

	const selectItem = (id: number) => {
		items.value = items.value.map(element => {
			if(element.id === id){
				element.isSelected = true;
			}
			return element;
		} ) as any;
	};
	const setItemSelectionById = (id: number, checked: boolean) => {
		items.value = items.value.map(element => {
			if(element.id === id){
				element.isSelected = checked;
			}
			return element;
		} ) as any;
	};

	const toggleItemSelection = (id: number) => {
		items.value = items.value.map(element => {
			if(element.id === id){
				element.isSelected = !element.isSelected;
			}
			return element;
		} ) as any;
	};

	const setItems = (itemList: SelectableItemOption[]) => {
		items.value = itemList.map((item) => (SelectableItem(item))) as any;
	};

	const deleteSelectedItems = () => {
		items.value = items.value.filter(element => element.isSelected === false);
	};

	return {
		items,
		isEmpty,
		isAllSelected,
		isMultipleSelected,
		getSelected,
		getEverySelected,
		selectAll,
		deselectAll,
		selectItem,
		toggleItemSelection,
		setItemSelectionById,
		setItems,
		SelectableItem,
		deleteSelectedItems,
	};

};
