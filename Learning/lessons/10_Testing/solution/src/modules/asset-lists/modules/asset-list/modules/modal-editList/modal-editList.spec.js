import { mount } from '@vue/test-utils';
import { plugins } from 'test/mount';
import { ref } from 'vue';
import { testList1, testList2 } from 'test/fixtures/lists';
import ModalEditList from './modal-editList.vue';
import { setupEditListModalStore, ModalStoreSymbol } from './modal-editList.store';
import { headerCloseButton } from 'test/widget-selectors/td-modal';

describe('Edit list modal', () => {

    test('Modal should be visible', () => {
        const { modalEditList } = setup();
        expect(modalEditList().exists()).toBe(true);
    });

    test('Clicking on the top-right modal close button should close the modal', async () => {
        const { wrapper, modalCloseButton } = setup();
        await modalCloseButton().trigger('click');
        expect(wrapper.isVisible()).toBe(false);
    });

    test('Should prefill the input with the current list title', () => {
        const { store, modalEditListInput } = setup();
        expect(modalEditListInput.element.value).toBe(store.list.value.title);
    });

    test('Edit button should be disabled when nothing is in input', async () => {
        const { modalEditListInput, modalEditListPrimaryButton } = setup();
        await modalEditListInput.setValue('');
        expect(modalEditListPrimaryButton.element.disabled).toBe(true);
    });

    test('Should edit list title', async () => {
        const { modalEditListPrimaryButton, store } = setup();
        await modalEditListPrimaryButton.trigger('click');
        expect(store.putListToApi).toHaveBeenCalled();
    });

    test('Clicking on close button should close the modal', async () => {
        const { wrapper, modalEditListCloseButton } = setup();
        await modalEditListCloseButton.trigger('click');
        // not really working for some reason
        expect(wrapper.isVisible()).toBe(false);
    });
});

function setup() {
    const putListToApi = jest.fn();
    const lists = ref([testList1, testList2]);
    const store = setupEditListModalStore({
        putListToApi,
        lists
    });
    store.openEditListModal();

    const provide = {
        [ ModalStoreSymbol ]: store,
    };

    const wrapper = mount(ModalEditList, {
        props: {
            id: 666
        },
        global: {
            provide,
            plugins
        }
    });

    const modalEditList = () => wrapper.find('[data-testid="modal-edit-list"]');
    const modalEditListInput = wrapper.find('[data-testid="modal-edit-list-input"]');
    const modalEditListPrimaryButton = wrapper.find('[data-testid="modal-edit-list-primary"]');
    const modalEditListCloseButton = wrapper.find('[data-testid="modal-edit-list-close"]');
    const modalCloseButton = headerCloseButton.bind(wrapper)
    return { wrapper, modalEditList, modalEditListInput, modalEditListPrimaryButton, modalEditListCloseButton, store, modalCloseButton }
}