<template>
	<td-modal
	@close="setDeleteModalVisibility(false)">
        <template #title>
            Deleting items
        </template>
        <template #content>
            <strong>Are you sure to delete these items?</strong>
            <ul style="margin-top: 1rem;">
                <li v-for="item in getEverySelected" :key="item.id">
                    {{ listItemInfo(item) }}
                </li>
            </ul>
        </template>
        <template #footer>
            <button
                class="button"
                @click="delItems()">
                Delete
            </button>
            <button
                class="button"
                @click="setDeleteModalVisibility(false)">
                Close
            </button>
        </template>
    </td-modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useModalStore } from './modal.store';
import { useAssetListStore } from './asset-list.store';

export default defineComponent({
	setup() {
		const listItemInfo = (item: any) => {
				return `${item.id} - ${item.name}, ${item.summary}`;
		};
		const { setDeleteModalVisibility } = useModalStore()
		const { deleteItems, getEverySelected } = useAssetListStore()
		const delItems = () => {
				deleteItems();
                setDeleteModalVisibility(false);
		};
		return {
			listItemInfo,
			delItems,
			setDeleteModalVisibility,
            getEverySelected
		};
	},
});
</script>
