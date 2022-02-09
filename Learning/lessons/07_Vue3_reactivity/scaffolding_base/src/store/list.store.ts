import { toRefs, reactive, provide, inject, InjectionKey, computed } from 'vue';
type ListStore = ReturnType<typeof setupListStore>
export const ListStoreSymbol: InjectionKey<ListStore> = Symbol('listStore');

type Item = {
	id: number
    name: string,
	summary: string
};

type Selectable<T> = {
	isSelected: boolean,
	item: T
};

type MultiSelectable<T> = {
	isMultiSelectable: boolean,
	itemList: T,
};

export const setupListStore = () => {

	const state = reactive<MultiSelectable<Selectable<Item>[]>>(
		{ isMultiSelectable: false, 
		itemList: [
			{isSelected: false, item: {id: 123, name: "item1", summary: "summary1"}},
			{isSelected: false, item: {id: 124, name: "item2", summary: "summary2"}},
			{isSelected: false, item: {id: 125, name: "item3", summary: "summary3"}},
			{isSelected: false, item: {id: 126, name: "item4", summary: "summary4"}},
			{isSelected: false, item: {id: 127, name: "item5", summary: "summary5"}}
		]}
	);

	/* Getters */

	const isEmpty = computed(() => {
		return state.itemList.length === 0 ? true : false;
	});

	const isAllSelected = computed(() => {
		let notSelected = state.itemList.filter(element => element.isSelected === false);
		return notSelected.length === 0 ? true : false;
	});

	const isMultipleSelected = computed(() => {
		let selected = state.itemList.filter(element => element.isSelected === true);
		return selected.length > 1 ? true : false;
	});

	const getSelected = computed(() => {
		let selected = state.itemList.filter(element => element.isSelected === true);
		return selected.length > 0 ? selected[0] : undefined
	});

	const getEverySelected = computed(() => {
		let selected = state.itemList.filter(element => element.isSelected === true);
		return selected
	});

	const isItemDisabled = computed((id: number) => {
		let selected = state.itemList.filter(element => element.isSelected === true);
		if (!isMultipleSelected && selected[0].item.id != id) {
			return true
		} else {
			return false
		}
	});

	/* Actions */

	const selectAll = () => {
		state.itemList.forEach(element => element.isSelected = true);
	}

	const deselectAll = () => {
		state.itemList.forEach(element => element.isSelected = false);
	}

	const selectItem = (id: number) => {
		let findItem = state.itemList.filter(element => element.item.id === id);
		state.itemList[state.itemList.indexOf(findItem[0])].isSelected = true;
	}

	const toggleItemSelection = (id: number) => {
		let findItem = state.itemList.filter(element => element.item.id === id);
		state.itemList[state.itemList.indexOf(findItem[0])].isSelected = !state.itemList[state.itemList.indexOf(findItem[0])].isSelected;
	}

	const setSelectability = (isMultiSelectable: boolean) => {
		state.isMultiSelectable = isMultiSelectable;
		console.log(isMultiSelectable);
	}

	return {
		...toRefs(state),
		isEmpty,
		isAllSelected,
		isMultipleSelected,
		getSelected,
		getEverySelected,
		isItemDisabled,
		selectAll,
		deselectAll,
		selectItem,
		toggleItemSelection,
		setSelectability
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
