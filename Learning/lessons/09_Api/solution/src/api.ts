import axios, { AxiosInstance } from 'axios';
import { List } from 'src/domain';

export type AxiosPartial = Pick<AxiosInstance, 'get'|'post'|'put'|'delete'>;

export function Api({ get, post, put }: AxiosPartial = Axios()) {
	return {
		/* scaffolding-disable unless keepExamples */
		async getChuckNorrisJoke(): Promise<string> {
			// The server side code can be found in /server/setup-api.js
			const { data } = await get('joke-api/jokes/random?escape=javascript');
			return data.value.joke;
		},
		async getListsCall(): Promise<Object> {
			const { data } = await get('lists');
			return data;
		},
		async postListCall(list: List) {
			await post('lists', list);
		},
		async editListCall(list: List) {
			await put('lists/' + list.id, {title: list.title});
		},
		/* scaffolding-enable */
	};
}
export type Api = ReturnType<typeof Api>;


// Use to set convenient defaults.
// * It's recommended that a request starts with a '/'
// * If it starts with http(s):// then its either unnecessary or triggers cross-origin requests.
// * If it leaves the '/' out then it will be relative to the current path, which requests sensitive to navigation.
function Axios() {
	return axios.create({ baseURL: 'http://localhost:3000/' });
}
