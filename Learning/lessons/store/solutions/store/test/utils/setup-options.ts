import { defineComponent } from 'vue';
import {
	i18n as i18nDefault,
	storeKey, VuexStore, widgets,
} from 'src/vue-setup';
import { I18n } from 'vue-i18n';
import { Router } from 'vue-router';
import { GlobalMountOptions } from '@vue/test-utils/dist/types';

type Options = {
	store?: VuexStore;
	router?: Router;
	i18n?: I18n<unknown, unknown, unknown, boolean>;
	provide?: GlobalMountOptions['provide'];
}

export function setupOptions({ store, i18n = i18nDefault, router, provide }: Options = {}) {
	const plugins: GlobalMountOptions['plugins'] = [i18n, widgets];
	if (store) { plugins.push([store, storeKey]); }
	if (router) { plugins.push(router); }
	return { global: { renderStubDefaultSlot: true, plugins, stubs, provide } };
}

// Safe to remove if vue-focus-lock is no longer directly used
// It had to be stubbed because it scheduled teardown after Jest already wiped the DOM
const stubs = {
	VueFocusLock: defineComponent({
		render() { return this.$slots.default?.(); },
	}),
};
