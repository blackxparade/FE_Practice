import { flushPromises, mount } from '@vue/test-utils';
import { plugins } from 'test/mount';
import { Household } from 'test/fixtures/lists';
import { AssetListHeader } from '.';
import { setupEditListModalStore, ModalStoreSymbol } from '../modal-editList/modal-editList.store';
import { AssetListStoreSymbol, setupAssetListStore } from '../../asset-list.store';
import { ApiSymbol } from 'src/api';
import { ref } from 'vue';

describe('Asset list header', () => {

    // make sure that the title in html is the title which came with the store
    test('Making sure the title appears and is correct', async () => {
        const { title, assetListTitle } = await setup();
        expect(assetListTitle().text()).toEqual(title.value);
    });
    test('Opening edit list modal', async () => {
        const { assetListEditTitleButton, store } = await setup();
        await assetListEditTitleButton().trigger('click');
        expect(store.showEditListModal.value).toBe(true);
    });
    test('deleteList is called', async () => {
        const { assetListDeleteButton, assetListStore } = await setup();
        await assetListDeleteButton().trigger('click');
        expect(assetListStore.deleteList).toBeCalled();
    });
});

async function setup() {
    const putListToApi = jest.fn();
    const getListData = jest.fn();
    const refreshList = jest.fn().mockReturnValue(Household);
    const api = {
		editListCall: jest.fn(),
        getListCall: jest.fn().mockReturnValue(Household),
		getListsCall: jest.fn().mockReturnValue(Household),
		deleteListCall: jest.fn()
	};
	const list = Household;
    const id = ref(23);
    const title = ref('[ListTitle]');

    const store = setupEditListModalStore({
        putListToApi,
		getListData,
    });

    const assetListStore = setupAssetListStore({ api, id, title, refreshList });
    assetListStore.deleteList = jest.fn();

    const provide = {
        [ ApiSymbol ]: api,
        [ AssetListStoreSymbol ]: assetListStore,
        [ ModalStoreSymbol ]: store,
    };

    await flushPromises();
    const wrapper = mount(AssetListHeader, {
        props: {
			id: id.value,
            title: title.value,
            list
		},
        global: {
            provide,
            plugins
        }
    });

    const assetListHeader = () => wrapper.find('[data-testid="asset-list-header"]');
    const assetListEditTitleButton = () => wrapper.find('[data-testid="asset-list-edit-title-button"]');
    const assetListTitle = () => wrapper.find('[data-testid="asset-list-title"]');
    const assetListDeleteButton = () => wrapper.find('[data-testid="asset-list-header-delete-button"]');
    return { wrapper, assetListHeader, assetListEditTitleButton, store, assetListStore, assetListTitle, title, assetListDeleteButton }

}