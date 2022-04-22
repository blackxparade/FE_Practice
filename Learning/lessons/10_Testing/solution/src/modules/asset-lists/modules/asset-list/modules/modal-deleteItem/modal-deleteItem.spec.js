import { mount } from '@vue/test-utils';
import { selectableBoiler, selectableCar, selectableGuitar } from 'test/fixtures/selectable-items';
import { ref } from 'vue';
import ModalDeleteItem from './modal-deleteItem.vue';
import { setupDeleteItemModalStore, ModalStoreSymbol } from './modal-deleteItem.store';
import { plugins } from 'test/mount';
test('Modal should be visibile', () => {
	const { wrapper, modalDeleteItem } =  setup();
	expect(modalDeleteItem().exists()).toBe(true);
});

test('Clicking on close modal close, should close the modal', () => {
	// Use declated data-testid in td-modal (maybe extraction?)
});

test('Should show the recieved items', () => {
	// Check dom textContent
});

test('Should delete the items', () => {
	// jest.fn() to have been called
});

test('Clicking on close button should close the modal', () => {
	// Trigger click on dom element, ( maybe await nextTick)
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

