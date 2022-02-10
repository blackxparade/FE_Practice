import { provide, inject, InjectionKey, computed, ref } from 'vue';
type ListStore = ReturnType<typeof setupListStore>
export const ListStoreSymbol: InjectionKey<ListStore> = Symbol('listStore');


type Selectable = {
	id: number;
	isSelected: boolean;
};

export const setupListStore = <T>() => {
	type SelectableItem = T & Selectable;

	function SelectableItem(item: T & Pick<Selectable, 'id'>): SelectableItem {
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

	// const isItemDisabled = computed((id: number) => {
	// 	const selected = items.filter(element => element.isSelected === true);
	// 	if (!isMultipleSelected.value && selected[0].item.id != id) {
	// 		return true;
	// 	} else {
	// 		return false;
	// 	}
	// });

	/* Actions */

	const selectAll = () => {
		items.value.forEach(element => element.isSelected = true);
	};

	const deselectAll = () => {
		items.value.forEach(element => element.isSelected = false);
	};

	const selectItem = (id: number) => {
		const findItem = items.value.filter(element => element.id === id);
		items[items.value.indexOf(findItem[0])].isSelected = true;
	};

	const toggleItemSelection = (id: number) => {
		const findItem = items.value.filter(element => element.item.id === id);
		items[items.value.indexOf(findItem[0])].isSelected = !items[items.value.indexOf(findItem[0])].isSelected;
	};

	const setItems = (itemList: T[]) => {
		items.value = itemList.map((item) => (SelectableItem(item))) as any;
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
	};

};

export const provideListStore = () => {
	const listStore = setupListStore();
	provide(ListStoreSymbol, listStore);
	return listStore;
};

export const useListStore = () => {
	return inject(ListStoreSymbol)!;
};
