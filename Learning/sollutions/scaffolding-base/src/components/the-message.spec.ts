/* scaffolding-delete-file unless keepExamples */
import { mount } from '@vue/test-utils';
import { byTestId, setupOptions, setupStore } from 'test/utils';
import TheMessage from './the-message.vue';

test('does not show popup with a falsy message', () => {
	const { vm } = setup({ message: '' });
	expect(vm.$el.opened).toBe(false);
});

test('shows popup when message turns to truthy', () => {
	const { vm } = setup({ message: 'Test message' });
	expect(vm.$el.opened).toBe(true);
});

test('shows message in popup', () => {
	const { wrapper } = setup({ message: 'Test message' });
	expect(wrapper.get(byTestId('modal-message')).text()).toBe('Test message');
});

test('loads Joke on button click', async () => {
	const { wrapper, actions } = setup({ message: 'Test message' });
	await wrapper.get(byTestId('show-joke')).trigger('click');
	expect(actions.loadJoke).toHaveBeenCalled();
});

// The setup function as a pattern is responsible for minimizing boilerplate in test / spec files
function setup({ message }: { message: string }) {
	const { store, actions } = setupStore();
	store.state.message = message;
	const wrapper = mount(TheMessage, setupOptions({ store }));
	return { wrapper, vm: wrapper.vm, actions };
}

