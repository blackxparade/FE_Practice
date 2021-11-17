import { Commit } from 'vuex'; // scaffolding-disable-line unless keepExamples
import { Api } from '../api';

export function Store({ api }: { api: Api }) {
	const state = {
		counter: 0,
		message: null as string | null,
		items: [
			{ id: "001", name: "Name01", summary: "Summary01" },
			{ id: "002", name: "Name02", summary: "Summary02" }
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
		addNewItem(state: State, item: any){
			state.items.push(item);
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
		addNewItem({ commit }: { commit: Commit }, item: any) {
			console.log(item);
			commit('addNewItem', item);
		},
		async loadJoke({ commit }: { commit: Commit }) {
			commit('showMessage', await api.getChuckNorrisJoke());
		},
	};

	return { state, getters, mutations, actions };
}
export type Store = ReturnType<typeof Store>;
