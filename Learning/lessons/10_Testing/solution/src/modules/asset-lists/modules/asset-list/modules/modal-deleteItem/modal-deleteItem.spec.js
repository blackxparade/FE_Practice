import { mount } from '@vue/test-utils';
import { selectableBoiler, selectableCar, selectableGuitar } from 'test/fixtures/selectable-items';
import { ref } from 'vue';
import ModalDeleteItem from './modal-deleteItem.vue';
import { setupDeleteItemModalStore, ModalStoreSymbol } from './modal-deleteItem.store';
import { plugins } from 'test/mount';
import { headerCloseButton } from 'test/widget-selectors/td-modal';

describe('Modal delete Item', () => {

	test('Modal should be visibile', async () => {
		const { modalDeleteItem, deleteListButton } = setup();
		await deleteListButton().trigger('click');
		expect(modalDeleteItem().isVisible()).toBe(true);
	});

	test('Delete button is enabled', () => {
		const { deleteListButton } = setup();
		expect(deleteListButton().isDisabled()).toBe(false);
	});

	test('Clicking on the top-right modal close button should close the modal', async () => {
		// Use declated data-testid in td-modal (maybe extraction?)
		const { modalCloseButton, store } = setup();
		await modalCloseButton().trigger('click');
		expect(store.showDeleteModal.value).toBe(false);
	});

	test('Should show the recieved items', () => {
		// Check dom textContent
		const { modalDeletableItemsList, getEverySelected, store } = setup();
		expect(modalDeletableItemsList().length).toBe(getEverySelected.value.length);
		expect(modalDeletableItemsList()[0].text()).toBe(store.listItemInfo(getEverySelected.value[0]));
	});

	test('Should delete the items', async () => {
		const { modalDeleteItemDeleteButton, store } = setup();
		await modalDeleteItemDeleteButton().trigger('click');
		expect(store.deleteItems).toHaveBeenCalled();
	});

	test('Clicking on close button should close the modal', async () => {
		// Trigger click on dom element, ( maybe await nextTick)
		const { modalDeleteItemCloseButton, store } = setup();
		await modalDeleteItemCloseButton().trigger('click');
		expect(store.showDeleteModal.value).toBe(false);
	});


});

function setup() {
	const deleteItems = jest.fn();
	const isDisabled = false;
	const getEverySelected = ref([selectableBoiler, selectableCar, selectableGuitar])
	const store =  setupDeleteItemModalStore({
		deleteItems,
		getEverySelected,
	});
	store.openDeleteModal();

	const provide = {
		[ ModalStoreSymbol ]: store,
	};
	const wrapper = mount(ModalDeleteItem, {
		props: {
			isDisabled
		},
		global: {
			provide,
			plugins
		}
	});
	const modalDeleteItem = () => wrapper.find('[data-testid="modal-delete-item"]');
	const modalDeletableItemsList = () => wrapper.findAll('[data-testid="deletable-items-list"]');
	const modalDeleteItemDeleteButton = () => wrapper.find('[data-testid="delete-items-button"]');
	const modalDeleteItemCloseButton = () => wrapper.find('[data-testid="close-button"]');
	const deleteListButton = () => wrapper.find('[data-testid="delete-list-button"]');
	const modalCloseButton = headerCloseButton.bind(wrapper)
	return { wrapper, isDisabled, modalDeleteItem, store, getEverySelected, modalCloseButton, modalDeletableItemsList, modalDeleteItemDeleteButton, modalDeleteItemCloseButton, deleteListButton };
}

