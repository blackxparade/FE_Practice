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
		addNewItem(state: State, item: Item){
			state.items = [ ...state.items, item ];
		},
		updateItem(state: State, item: Item){
			let itemIndex = state.items.findIndex(element => element.id === item.id);
			state.items[itemIndex] = item;
		}
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
		async loadJoke({ commit }: { commit: Commit }) {
			commit('showMessage', await api.getChuckNorrisJoke());
		},
	};

	return { state, getters, mutations, actions };
}
export type Store = ReturnType<typeof Store>;
