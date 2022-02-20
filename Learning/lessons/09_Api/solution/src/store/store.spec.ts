/* scaffolding-delete-file unless keepExamples */
import { Api } from 'src/api';
import { Store } from './store';

// test('is unit testable with api mocked out', async () => {
// 	const getChuckNorrisJoke = jest.fn().mockResolvedValue('Test joke');
// 	const { store, commit } = setup({ getChuckNorrisJoke });
// 	await store.actions.loadJoke({ commit });
// 	expect(commit).toHaveBeenCalledWith('showMessage', 'Test joke');
// });

function setup(api: Api) {
	const store = Store({ api });
	return { store, commit: jest.fn() };
}
