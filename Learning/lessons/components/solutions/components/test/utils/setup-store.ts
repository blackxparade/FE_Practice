import { Api, AxiosPartial } from 'src/api';
import { Store } from 'src/store';
import { createStore as createVuexStore, Store as VuexStore } from 'vuex';

type StoreSetup = { store: VuexStore<Store['state']> } & MockableStore<Store>;

/** Creates a store with mocked actions. */
export function setupStore(): StoreSetup;
/** Creates a store with the specified `Api`. */
export function setupStore(args: { api: Partial<Api> }): StoreSetup;
/** Creates a store with the specified Axios implementation for networking. */
export function setupStore(args: { axios: AxiosPartial }): StoreSetup;

export function setupStore(
	{ axios, api }:
	{ axios?: AxiosPartial; api?: Partial<Api> } = {},
) {
	if (axios) {
		return setupStore({ api: Api(axios) });
	}
	const store = Store({ api: (api ? api : {}) as Api });
	const mockableStore = toMockable(store, !api);
	return { ...mockableStore, store: createVuexStore(mockableStore) };
}

/** Swaps out actions in a store with mocks that by default resolve */
/* eslint-disable @typescript-eslint/no-explicit-any */
function toMockable({ getters, actions, modules, ...rest }: any, mockActions: boolean): any {
	const asJestFn = (implementation: any) => jest.fn(implementation);
	const toAsyncMock = () => jest.fn().mockResolvedValue(undefined);

	const store = {
		getters: map(asJestFn, getters),
		actions: mockActions ? map(toAsyncMock, actions) : map(asJestFn, actions),
		...rest,
	};
	return modules ?
		{ ...store, modules: map(module => toMockable(module, mockActions), modules) } :
		store;
}
/* eslint-enable @typescript-eslint/no-explicit-any */

type GenericStore = {
	getters?: Record<string, unknown>;
	actions?: Record<string, unknown>;
	modules?: Record<string, GenericStore>;
};
type MockableStore<S extends GenericStore> =
	// Take everything from the base store except the actions and modules
	Omit<S, 'getters'|'actions'|'modules'> &
	// Swap the getters for Jest mocks
	{ getters: jest.Mocked<S['getters']> } &
	// Swap the actions for Jest mocks
	{ actions: jest.Mocked<S['actions']> } &
	// Recursively swap out the actions for Jest mocks on the modules
	{ modules: { [K in keyof S['modules']]: MockableStore<S['modules'][K]> } };

// Behaves the same way as the Ramda.js map function would if called with an object
function map<T, U>(mapper: (value: T) => U, object: Record<string, T>): Record<string, U> {
	const mapValue = (acc: Record<string, U>, [key, value]: [string, T]) => ({ ...acc, [key]: mapper(value) });
	return Object.entries(object).reduce(mapValue, {});
}
