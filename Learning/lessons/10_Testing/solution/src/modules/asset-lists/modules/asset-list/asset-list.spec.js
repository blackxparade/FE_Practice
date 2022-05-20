// TODO - test cases
// make sure that the title in html is the title which came with the store
// make sure that when clicking on "Add item" the modal opens
// make sure that when clicking on "Edit" the modal opens
//      - make sure that the edit button is only enabled when exactly 1 item is selected
// make sure that when clicking on "Delete" the modal opens
//      - make sure that the delete button is only enabled when at least 1 item is selected
// make sure that the asset item list is the list which came with the api call

import { plugins } from 'test/mount';
import { setupListStore, AssetListStoreSymbol } from './asset-list.store';
import { mount } from '@vue/test-utils';
import { Household } from 'test/fixtures/lists';
import AssetList from './asset-list.vue';

describe('Asset list', () => {

    test('List title should be correct', () => {
        const { store, assetListTitle } = setup();
        expect(assetListTitle().text).toBe(store.title.value);
    });

});

function setup() {
    const refreshlist = jest.fn();
    const api = { editListCall: jest.fn(),  deleteListCall: jest.fn() };
    const store = setupListStore({
        api,
        id: Household.id,
        title: Household.title,
        refreshlist
    });

    const provide = {
        [ AssetListStoreSymbol ]: store
    };

    const wrapper = mount(AssetList, {
        global: {
            provide,
            plugins
        }
    });

    const assetListTitle = () => wrapper.find('[data-testid="asset-list-title"]')

    return { wrapper, store, assetListTitle }
}