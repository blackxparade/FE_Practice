import { plugins } from 'test/mount';
import { mount } from '@vue/test-utils';
import { headerCloseButton } from 'test/widget-selectors/td-modal';
import { ref } from 'vue';
import { setupNewItemModalStore, ModalStoreSymbol } from './modal-newItem.store';
import ModalNewItem from './modal-newItem.vue';

describe('New item modal', () => {

    test('Modal should be visible', () => {
        const { modalNewItem } = setup();
        expect(modalNewItem().exists()).toBe(true);
    });

    test('Clicking on the top-right modal close button should close the modal', async () => {
        const { wrapper, modalCloseButton } = setup();
        await modalCloseButton().trigger('click');
        expect(wrapper.isVisible()).toBe(false);
    });

    test('Inputs should be empty', () => {
        const { modalNewItemInputName, modalNewItemInputSummary } = setup();
        expect(modalNewItemInputName().element.value).toBe('');
        expect(modalNewItemInputSummary().element.value).toBe('');
    });
    
    test('Should add new item', async () => {
        const { modalNewItemButtonPrimary, store, modalNewItemInputName, modalNewItemInputSummary } = setup();
        await modalNewItemInputName().setValue("newname");
        await modalNewItemInputSummary().setValue("newsummary");
        await modalNewItemButtonPrimary().trigger('click');
        expect(store.addItem).toHaveBeenCalled();
    });
    
    test('Add button should be disabled when nothing is in input', async () => {
        const { modalNewItemInputName, modalNewItemInputSummary, modalNewItemButtonPrimary } = setup();
        await modalNewItemInputName().setValue('');
        await modalNewItemInputSummary().setValue('');
        expect(modalNewItemButtonPrimary().element.disabled).toBe(true);
    });

    test('Clicking on close button should close the modal', async () => {
        const { wrapper, modalNewItemButtonClose } = setup();
        await modalNewItemButtonClose().trigger('click');
        expect(wrapper.isVisible()).toBe(false);
    });
});

function setup() {
    const addItem = jest.fn();
    const store = setupNewItemModalStore({
        addItem
    });
    store.openNewModal();
    const provide = {
        [ModalStoreSymbol]: store,
    };
    const wrapper = mount(ModalNewItem, {
        global: {
            provide,
            plugins
        }
    });

    const modalNewItem = () => wrapper.find('[data-testid="modal-new-item"]');
    const modalNewItemInputName = () => wrapper.find('[data-testid="modal-new-item-input-name"]');
    const modalNewItemInputSummary = () => wrapper.find('[data-testid="modal-new-item-input-summary"]');
    const modalNewItemButtonPrimary = () => wrapper.find('[data-testid="modal-new-item-button-primary"]');
    const modalNewItemButtonClose = () => wrapper.find('[data-testid="modal-new-item-button-close"]');
    const modalCloseButton = headerCloseButton.bind(wrapper)

    return { wrapper, store, modalNewItem, modalNewItemInputName, modalNewItemInputSummary, modalNewItemButtonPrimary, modalNewItemButtonClose, modalCloseButton };
}