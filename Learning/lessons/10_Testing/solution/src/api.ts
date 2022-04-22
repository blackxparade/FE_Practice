import axios, { AxiosInstance } from 'axios';
import { List } from 'src/domain';
import { inject, InjectionKey } from 'vue';

export type AxiosPartial = Pick<AxiosInstance, 'get'|'post'|'put'|'delete'>;

export function Api({ get, post, put, delete: del }: AxiosPartial = Axios()) {
	return {
		/* scaffolding-disable unless keepExamples */
		async getChuckNorrisJoke(): Promise<string> {
			// The server side code can be found in /server/setup-api.js
			const { data } = await get('joke-api/jokes/random?escape=javascript');
			return data.value.joke;
		},
		async getListsCall() {
			const { data } = await get<List[]>('lists');
			return data.map((element) => (List({ ...element })));
		},
		async getListCall(id: number) {
			const { data } = await get<List>('lists/' + id);
			return List({ ...data });
		},
		async postListCall(list: List) {
			return await post('lists', list);
		},
		async editListCall(list: List) {
			return await put('lists/' + list.id, {title: list.title, items: list.items});
		},
		async deleteListCall(id: number) {
			return await del('lists/' + id);
		}
		/* scaffolding-enable */
	};
}
export type Api = ReturnType<typeof Api>;
export const ApiSymbol: InjectionKey<Api> = Symbol('api');

// Use to set convenient defaults.
// * It's recommended that a request starts with a '/'
// * If it starts with http(s):// then its either unnecessary or triggers cross-origin requests.
// * If it leaves the '/' out then it will be relative to the current path, which requests sensitive to navigation.
function Axios() {
	return axios.create({ baseURL: 'http://localhost:3000/' });
}

export const useApi = () => {
	return inject(ApiSymbol)!
};
