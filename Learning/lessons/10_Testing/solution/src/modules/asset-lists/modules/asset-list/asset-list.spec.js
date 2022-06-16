import { plugins } from 'test/mount';
import { AssetListsStoreSymbol, setupAssetListsStore } from '../../asset-lists.store';
import { flushPromises, mount } from '@vue/test-utils';
import { Household } from 'test/fixtures/lists';
import AssetList from './asset-list.vue';
import { ApiSymbol } from 'src/api';
import { ref } from 'vue';
import { selectableItems } from 'test/fixtures/selectable-items';

describe('Asset list', () => {

    test('List title should be correct', async () => {
        const { title, assetListTitle } = await setup();
        expect(assetListTitle().text()).toBe(title.value);
    });

    test('Asset item list is the correct one', async () => {
        const { assetListItem } = await setup();
        const firstItemID = parseInt(assetListItem()[0].text().split(' ', 1));
        expect(assetListItem().length).toEqual(selectableItems.length);
        expect(firstItemID).toEqual(selectableItems[0].id);
    });

});

async function setup() {
    const refreshList = jest.fn();
	const title = ref('[ListTitle]');
	const id = ref(23);
    const api = {
		editListCall: jest.fn(),
        getListCall: jest.fn().mockReturnValue(Household),
		getListsCall: jest.fn().mockReturnValue(Household),
		deleteListCall: jest.fn()
	};
	const assetListsStore = setupAssetListsStore({ api });

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

    wrapper.vm.items = selectableItems;
    const assetListTitle = () => wrapper.find('[data-testid="asset-list-title"]');
    const assetListItem = () => wrapper.findAll('[data-testid="asset-list-item"]');

    return { wrapper, assetListsStore, api, assetListTitle, assetListItem, title, id, refreshList }
}
