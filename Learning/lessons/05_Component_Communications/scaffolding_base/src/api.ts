import axios, { AxiosInstance } from 'axios';

export type AxiosPartial = Pick<AxiosInstance, 'get'|'post'|'put'|'delete'>;

export function Api({ get }: AxiosPartial = Axios()) {
	return {
		/* scaffolding-disable unless keepExamples */
		async getChuckNorrisJoke(): Promise<string> {
			// The server side code can be found in /server/setup-api.js
			const { data } = await get('joke-api/jokes/random?escape=javascript');
			return data.value.joke;
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
	return axios.create({ baseURL: process.env.API_PATH });
}
