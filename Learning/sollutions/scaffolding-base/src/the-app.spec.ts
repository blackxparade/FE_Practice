import { shallowMount } from '@vue/test-utils';
import { routerKey } from 'vue-router';
import { byTestId, setupOptions, setupStore } from 'test/utils';
import { fetchTranslations } from 'src/vue-setup'; // scaffolding-disable-line unless keepExamples
import App from './the-app.vue';

test('displays in English by default', async () => {
	// The "vm" is the component instance, short for ViewModel.
	const { vm } = setup();
	expect(vm.$i18n.locale).toBe('en');
});

/* scaffolding-disable unless keepExamples */
test('toggles language', async () => {
	await fetchTranslations({ locale: 'zh-cn', languageCode: 'zh' });
	const { wrapper, vm } = setup();
	await wrapper.get(byTestId('toggle-language')).trigger('click');
	expect(vm.$i18n.locale).toBe('zh');
});

test('pushes message input value to URL', async () => {
	const { wrapper, router } = setup();
	await wrapper.get('#message-input').setValue('test-message');
	expect(router.push).toHaveBeenCalledWith({ query: { message: 'test-message' } });
});
/* scaffolding-enable */
function setup() {
	const { store } = setupStore();
	const router = { push: jest.fn() };
	const provide = { [routerKey as symbol]: router };
	const wrapper = shallowMount(App, setupOptions({ store, provide }));
	return { wrapper, vm: wrapper.vm, router };
}

