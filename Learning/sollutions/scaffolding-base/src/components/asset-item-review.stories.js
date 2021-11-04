import AssetItemReview from './asset-item-review'
import { tdExample } from '../example-font-awesome-icon-pack';

export default { title: 'components / asset-item' };

export const base = () => {

	return ({
		template: `
            <asset-item-review v-bind="sampleAssetItem" />
		`,
		components: { AssetItemReview },
        setup() {
            const sampleAssetItem = { name: 'Item 1', summary: 'Item summary', icon: tdExample, type: 'this is type' };
            return {
                tdExample,
                sampleAssetItem
            };
        },
	});
};

export const customSummary = () => {

	return ({
		template: `
            <asset-item-review v-bind="sampleAssetItem">
                <template #summary>
                    <span>Location: </span> <a href="http://www.google.com">Stock Room 01</a>
                </template>
            </asset-item-review>
		`,
		components: { AssetItemReview },
        setup() {
            const sampleAssetItem = { name: 'Item 1', summary: 'Item summary', icon: tdExample, type: 'this is type' };
            return {
                tdExample,
                sampleAssetItem
            };
        },
	});
};