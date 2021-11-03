import { createStore as createVuexStore, useStore as useVuexStore } from 'vuex';
import { InjectionKey } from 'vue';
import { Store } from '../store';
import { Api } from '../api';

// Export for production use
export const store = VuexStore();

// Export for testing, maybe development
export function VuexStore(
	{ api = Api(), strict = process.env.NODE_ENV !== 'production' }:
	{ api?: Api; strict?: boolean } = {},
) {
	return createVuexStore({ ...Store({ api }), strict });
}
// Get more specific type info this way
export type VuexStore = ReturnType<typeof VuexStore>;
export const storeKey: InjectionKey<VuexStore> = Symbol();

// Convenience so that components don't have to import both
// useStore from vuex and the storeKey to access to the store
export function useStore(): VuexStore {
	return useVuexStore(storeKey);
}
