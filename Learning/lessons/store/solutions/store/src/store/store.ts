import { Commit } from 'vuex'; // scaffolding-disable-line unless keepExamples
import { Api } from '../api';

type Item = ReturnType<typeof Item>;

function Item({
	id = Math.floor(Math.random() * 100),
	name = '',
	summary = '',
} = {}) {
	return { id, name, summary };
}

export function Store({ api }: { api: Api }) {
	const state = {
		counter: 0,
		message: null as string | null,
		showNewModal: false,
		showEditModal: false,
		showDeleteModal: false,
		items: [
			Item({ name: 'Name01', summary: 'Summary01' }),
			Item({ name: 'Name02', summary: 'Summary02' }),
		],
	};


	type State = typeof state;

	const getters = {
		isTired({ counter }: State) {
			return counter >= 5;
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
			state.items = [ ...state.items, item ];
		},
		updateItem(state: State, item: Item) {
			const itemIndex = state.items.findIndex(element => element.id === item.id);
			state.items[itemIndex] = { ...item };
		},
		deleteItem(state: State, id: number) {
			state.items = state.items.filter(element => element.id != id);
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
		deleteItems({ commit }: { commit: Commit }, ids: number[]){
			for(let i=0; i<ids.length; i++) {
				commit('deleteItem', ids[i]);
			}
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
