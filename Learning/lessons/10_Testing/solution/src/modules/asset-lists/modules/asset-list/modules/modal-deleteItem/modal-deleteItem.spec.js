import { mount } from '@vue/test-utils';
import { selectableBoiler, selectableCar, selectableGuitar } from 'test/fixtures/selectable-items';
import { ref } from 'vue';
import ModalDeleteItem from './modal-deleteItem.vue';
import { setupDeleteItemModalStore, ModalStoreSymbol } from './modal-deleteItem.store';
import { plugins } from 'test/mount';
import { headerCloseButton } from 'test/widget-selectors/td-modal';

describe('Modal delete Item', () => {

	test('Modal should be visibile', () => {
		const { modalDeleteItem } =  setup();
		expect(modalDeleteItem().exists()).toBe(true);
	});

	test('Clicking on the top-right modal close button should close the modal', async () => {
		// Use declated data-testid in td-modal (maybe extraction?)
		const { wrapper, modalCloseButton } = setup();
		await modalCloseButton().trigger('click');
		expect(wrapper.isVisible()).toBe(false);
	});

	test('Should show the recieved items', () => {
		// Check dom textContent
		const { wrapper, getEverySelected, store } = setup();
		const modalDeletableItemsList = wrapper.findAll('[data-testid="deletable-items-list"]');
		expect(modalDeletableItemsList.length).toBe(getEverySelected.value.length);
		expect(modalDeletableItemsList[0].text()).toBe(store.listItemInfo(getEverySelected.value[0]));
	});

	test('Should delete the items', () => {
		const { wrapper, store } = setup();
		wrapper.find('[data-testid="delete-items-button"]').trigger('click');
		expect(store.deleteItems).toHaveBeenCalled();
	});

	test('Clicking on close button should close the modal', async () => {
		// Trigger click on dom element, ( maybe await nextTick)
		const { wrapper } = setup();
		await wrapper.find('[data-testid="close-button"]').trigger('click');
		expect(wrapper.isVisible()).toBe(false);
	});


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
	const modalCloseButton = headerCloseButton.bind(wrapper)
	return { wrapper, modalDeleteItem, store, getEverySelected, modalCloseButton };
}

