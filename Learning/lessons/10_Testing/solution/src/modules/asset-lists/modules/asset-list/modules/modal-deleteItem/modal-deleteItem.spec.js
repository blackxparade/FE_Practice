import { mount } from '@vue/test-utils';
import { selectableBoiler, selectableCar, selectableGuitar } from 'test/fixtures/selectable-items';
import { ref } from 'vue';
import ModalDeleteItem from './modal-deleteItem.vue';
import { setupDeleteItemModalStore, ModalStoreSymbol } from './modal-deleteItem.store';
import { plugins } from 'test/mount';
test('Modal should be visibile', () => {
	const { modalDeleteItem } =  setup();
	expect(modalDeleteItem().exists()).toBe(true);
});

test('Clicking on close modal close, should close the modal', async () => {
	// Use declated data-testid in td-modal (maybe extraction?)
	const { wrapper } = setup();
	await wrapper.find('[data-testid="td-modal-close-button"]').trigger('click');
	expect(wrapper.isVisible()).toBe(false);
});

test('Should show the recieved items', () => {
	// Check dom textContent
	const { wrapper } = setup();
	const modalDeletableItemsList = wrapper.find('[data-testid="deletable-items-list"]');
	expect(modalDeletableItemsList.exists()).toBe(true);
});

test('Should delete the items', () => {
	const { wrapper, deleteItems } = setup();
	wrapper.find('[data-testid="delete-items-button"]').trigger('click');
	let asd = deleteItems();
	// if i want to call deleteItems it says "is not a function", no idea what to do from here
	expect(deleteItems).toHaveBeenCalled();
});

test('Clicking on close button should close the modal', async () => {
	// Trigger click on dom element, ( maybe await nextTick)
	const { wrapper } = setup();
	await wrapper.find('[data-testid="close-button"]').trigger('click');
	expect(wrapper.isVisible()).toBe(false);
});



function setup() {
	const deleteItems = jest.fn();
	const getEverySelected = ref([selectableBoiler, selectableCar, selectableGuitar])
	const store =  setupDeleteItemModalStore({
		deleteItems,
		getEverySelected,
	});
	store.openDeleteModal();

	const provide = {
		[ModalStoreSymbol]: store,
	};
	const wrapper = mount(ModalDeleteItem, {
		global: {
			provide,
			plugins
		}
	});
	const modalDeleteItem = () => ( wrapper.find('[data-testid="modal-delete-item"]') );
	return { wrapper, modalDeleteItem };
}

