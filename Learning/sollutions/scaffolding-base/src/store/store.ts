import { Commit } from 'vuex'; // scaffolding-disable-line unless keepExamples
import { Api } from '../api';

// This structure follows the Vuex store specification
export function Store({ api }: { api: Api }) {
	// The most relevant object to your app
	const state = {
		/* scaffolding-disable unless keepExamples */
		counter: 0,
		message: null as string | null,
		/* scaffolding-enable */
	};
	type State = typeof state;

	// What you can compute from the state
	const getters = {
		/* scaffolding-disable unless keepExamples */
		isTired({ counter }: State) {
			return counter >= 5;
		},
		/* scaffolding-enable */
	};
	// The "getters" object has named functions so that Vuex knows how to compute the values.
	// Vuex passes the cached results to actions functions.
	// We want "Getters" to describe these cached values. Let's break it down:
	// - take the type of the getters object
	// - include all of its keys (eg. "isTired")
	// - map the type to whatever the function returns (eg. "isTired" returns a boolean)
	type Getters = { [key in keyof typeof getters]: ReturnType<typeof getters[key]> };

	// The only mutations and actions are supposed to modify the state
	// Fast, synchronous state changes
	const mutations = {
		/* scaffolding-disable unless keepExamples */
		incrementCounter(state: State) {
			state.counter++;
		},
		showMessage(state: State, message: string) {
			state.message = message;
		},
		/* scaffolding-enable */
	};

	// Async / multi step changes
	const actions = {
		/* scaffolding-disable unless keepExamples */
		incrementCounter({ commit, getters }: { commit: Commit; getters: Getters }) {
			commit('incrementCounter');
			if (getters.isTired) {
				commit('showMessage', 'Getting tired with all this incrementing nonsense.');
			}
		},
		// Even though components could directly commit mutations (for now)
		// It's cleaner if they only ever dispatch actions.
		// This way there is no confusion whether to use dispatch or commit
		showMessage({ commit }: { commit: Commit }, message: string) {
			commit('showMessage', message);
		},
		dismissMessage({ commit }: { commit: Commit }) {
			commit('showMessage', null);
		},
		async loadJoke({ commit }: { commit: Commit }) {
			commit('showMessage', await api.getChuckNorrisJoke());
		},
		/* scaffolding-enable */
	};

	return { state, getters, mutations, actions };
}
export type Store = ReturnType<typeof Store>;
