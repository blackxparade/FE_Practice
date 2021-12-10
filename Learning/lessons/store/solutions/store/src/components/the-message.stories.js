/* scaffolding-delete-file unless keepExamples */
import { createStore as createVuexStore } from 'vuex';
import { Store } from 'src/store';
import TheMessage from './the-message';
import { storeKey } from 'src/vue-setup';

export default { title: 'components / the-message' };

const DOES_TOO_MUCH = `
This is an "app component" connected to Vuex.
While it's possible to hook up Storybook with Vuex it can get out of hand quickly.
Instead, go with "UI components" in Storybook that focus on "look and feel" and interactions.
`;

export const shouldNotBeInStorybook = () => {
	const store = DummyStore();

	return ({
		template: `
			<div>
				<section class="section has-text-danger">
					<p>
						Careful: Mixing app and UI components can get out of hand quickly.
					</p>
					<button @click="provokeMessage">Show message</button>
				</section>
				<the-message />
			</div>
		`,
		// Pass in a custom made store into the app component
		components: { TheMessage },
		provide: { [storeKey]: store },
		setup: () => ({
			provokeMessage() {
				// Would also break if message handling changes in the store
				store.commit('showMessage', DOES_TOO_MUCH);
			},
		}),
	});
};

function DummyStore() {
	// Build a store with a useless API
	const store = Store({ api: false });
	const actions = {
		...store.actions,
		// Doing nothing where networking would be needed
		loadJoke: () => {/* Do nothing */},
	};
	return createVuexStore({ ...store, actions });
}
