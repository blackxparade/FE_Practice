import { Commit } from 'vuex'; // scaffolding-disable-line unless keepExamples
import { Api } from '../api';

type Item = ReturnType<typeof Item>;
type SelectableItem = ReturnType<typeof SelectableItem>;

function Item({
	id = Math.floor(Math.random() * 100),
	name = '',
	summary = '',
} = {}) {
	return { id, name, summary };
}

function SelectableItem<T>(isSelected: boolean, item: T){
	return { isSelected, item };
}

export function Store({ api }: { api: Api }) {
	const state = {
		counter: 0,
		message: null as string | null,
		showNewModal: false,
		showEditModal: false,
		showDeleteModal: false,
		items: [
			SelectableItem(false, Item({ name: 'Name01', summary: 'Summary01' })),
			SelectableItem(true, Item({ name: 'Name02', summary: 'Summary02' })),
		]
	};

	type State = typeof state;

	const getters = {
		isTired({ counter }: State) {
			return counter >= 5;
		},
		selectedItems({ items }: State) {
			return items.filter(element => element.isSelected == true);
		},
	};
	type Getters = { [key in keyof typeof getters]: ReturnType<typeof getters[key]> };
	const mutations = {
		incrementCounter(state: State) {
			state.counter++;
		},
		showMessage(state: State, message: string) {
			state.message = message;
		},
		addNewItem(state: State, item: Item) {
			state.items = [ ...state.items, SelectableItem(false, item) ];
		},
		updateItem(state: State, item: Item) {
			const itemIndex = state.items.findIndex(element => element.item.id === item.id);
			state.items[itemIndex] = { ...SelectableItem(state.items[itemIndex].isSelected, item) };
		},
		deleteSelectedItems(state: State) {
			// filter out the NOT selected items, make a new array with em
			state.items = state.items.filter(element => element.isSelected === false);
		},
		selectionChange(state: State, id: number) {
			const itemIndex = state.items.findIndex(element => element.item.id === id);
			state.items[itemIndex].isSelected = !state.items[itemIndex].isSelected;
		},
		clearSelections(state: State) {
			state.items.forEach((item) => {
				if (item.isSelected === true) {
					item.isSelected = false;
				}
			});
		},
		setNewModalVisibility(state: State, value: boolean) {
			state.showNewModal = value;
		},
		setEditModalVisibility(state: State, value: boolean) {
			state.showEditModal = value;
		},
		setDeleteModalVisibility(state: State, value: boolean) {
			state.showDeleteModal = value;
		},
	};

	const actions = {
		incrementCounter({ commit, getters }: { commit: Commit; getters: Getters }) {
			commit('incrementCounter');
			if (getters.isTired) {
				commit('showMessage', 'Getting tired with all this incrementing nonsense.');
			}
		},
		showMessage({ commit }: { commit: Commit }, message: string) {
			commit('showMessage', message);
		},
		dismissMessage({ commit }: { commit: Commit }) {
			commit('showMessage', null);
		},
		addNewItem({ commit }: { commit: Commit }, item: Pick<Item, 'name' | 'summary'>) {
			commit('addNewItem', Item({ ...item }));
		},
		updateItem({ commit }: { commit: Commit }, item: Pick<Item, 'id'| 'name' | 'summary'>) {
			commit('updateItem', item);
		},
		deleteSelectedItems({ commit }: { commit: Commit }) {
			commit('deleteSelectedItems');	
		},
		selectionChange({ commit }: { commit : Commit }, id: number) {
			commit('selectionChange', id);
		},
		clearSelections({ commit }: { commit : Commit }) {
			commit('clearSelections');
		},
		setNewModalVisibility({ commit }: { commit: Commit }, value: boolean) {
			commit('setNewModalVisibility', value);
		},
		setEditModalVisibility({ commit }: { commit: Commit }, value: boolean) {
			commit('setEditModalVisibility', value);
		},
		setDeleteModalVisibility({ commit }: { commit: Commit }, value: boolean) {
			commit('setDeleteModalVisibility', value);
		},
		async loadJoke({ commit }: { commit: Commit }) {
			commit('showMessage', await api.getChuckNorrisJoke());
		},
	};

	return { state, getters, mutations, actions };
}
export type Store = ReturnType<typeof Store>;
