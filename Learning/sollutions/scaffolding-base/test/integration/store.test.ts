/* scaffolding-delete-file unless keepExamples */
import { AxiosMock, setupStore } from 'test/utils';

test('is integration testable with http client mock', async () => {
	const axios = AxiosMock();
	const { store } = setupStore({ axios });
	axios.get.mockResolvedValue({ data: Joke('Remote joke') });

	await store.dispatch('loadJoke');
	expect(axios.get).toHaveBeenCalledTimes(1);
	expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('/jokes/random'));
	expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('?escape=javascript'));
	expect(store.state.message).toBe('Remote joke');
});

function Joke(joke: string) {
	return { value: { joke } };
}
