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

export const setupListStore = () => {

	/* State */

	const state = reactive<Selectable<Item>[]>(
		[{isSelected: false, item: {id: 123, name: "asd", summary: "asd"}},
		{isSelected: false, item: {id: 124, name: "asd", summary: "asd"}}]
	);

	/* Getters */

	const isEmpty = computed(() => {
		return state.length === 0 ? true : false;
	});

	const isAllSelected = computed(() => {
		let notSelected = state.filter(element => element.isSelected === false);
		return notSelected.length === 0 ? true : false;
	});

	const isMultipleSelected = computed(() => {
		let selected = state.filter(element => element.isSelected === true);
		return selected.length > 1 ? true : false;
	});

	const getSelected = computed(() => {
		let selected = state.filter(element => element.isSelected === true);
		return selected.length > 0 ? selected[0] : undefined
	});

	const getEverySelected = computed(() => {
		let selected = state.filter(element => element.isSelected === true);
		return selected
	});

	/* Actions */

	const selectAll = () => {
		state.forEach(element => element.isSelected = true);
	}

	const deselectAll = () => {
		state.forEach(element => element.isSelected = false);
	}

	const selectItem = (id: number) => {
		let findItem = state.filter(element => element.item.id === id);
		state[state.indexOf(findItem[0])].isSelected = true;
	}

	const toggleItemSelection = (id: number) => {
		let findItem = state.filter(element => element.item.id === id);
		state[state.indexOf(findItem[0])].isSelected = true;
	}

	return {
		...toRefs(state),
		isEmpty,
		isAllSelected,
		isMultipleSelected,
		getSelected,
		getEverySelected,
		selectAll,
		deselectAll,
		selectItem,
		toggleItemSelection
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
