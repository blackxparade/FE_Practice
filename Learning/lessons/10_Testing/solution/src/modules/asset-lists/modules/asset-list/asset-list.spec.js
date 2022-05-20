// TODO - test cases
// make sure that the title in html is the title which came with the store
// make sure that when clicking on "Add item" the modal opens
// make sure that when clicking on "Edit" the modal opens
//      - make sure that the edit button is only enabled when exactly 1 item is selected
// make sure that when clicking on "Delete" the modal opens
//      - make sure that the delete button is only enabled when at least 1 item is selected
// make sure that the asset item list is the list which came with the api call

import { plugins } from 'test/mount';
import { AssetListsStoreSymbol, setupAssetListsStore } from '../../asset-lists.store';
import { flushPromises, mount } from '@vue/test-utils';
import { Household } from 'test/fixtures/lists';
import AssetList from './asset-list.vue';
import { ApiSymbol } from 'src/api';
import { ref } from 'vue';

describe('Asset list', () => {

    test('List title should be correct', async () => {
        const { title, assetListTitle } = await setup();
        expect(assetListTitle().text()).toBe(title.value);
    });

});

async function setup() {
    const refreshList = jest.fn();
	const title = ref('[ListTitle]')
	const id = ref(23)
    const api = {
		editListCall: jest.fn(),
		getListsCall: jest.fn().mockReturnValue(Household),
		deleteListCall: jest.fn()
	};
	const assetListsStore = setupAssetListsStore({api})

    const provide = {
        [ ApiSymbol ]: api,
        [ AssetListsStoreSymbol ]: assetListsStore
    };

	await flushPromises();
    const wrapper = mount(AssetList, {
		props: {
			id,
			title,
			refreshList,
		},
        global: {
            provide,
            plugins
        }
    });

    const assetListTitle = () => wrapper.find('[data-testid="asset-list-title"]')

    return { wrapper, assetListsStore, api, assetListTitle, title, id, refreshList }
}
