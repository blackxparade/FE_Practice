<template>
	<modal
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
                @click="deleteItems()">
                Delete
            </button>
            <button
                class="button"
                @click="setDeleteModalVisibility(false)">
                Close
            </button>
        </template>
    </modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useModalStore } from './modal.store';
import { useAssetListStore } from './asset-list.store';
import Modal from 'src/components/modal.vue';

export default defineComponent({
	components: {
		Modal
	},
	setup() {
		const listItemInfo = (item: any) => {
				return `${item.id} - ${item.name}, ${item.summary}`;
		};
		const { setDeleteModalVisibility } = useModalStore()
		const { deleteSelectedItems, getEverySelected } = useAssetListStore()
		const deleteItems = () => {
				deleteSelectedItems();
                setDeleteModalVisibility(false);
		};
		return {
			listItemInfo,
			deleteItems,
			setDeleteModalVisibility,
            getEverySelected
		};
	},
});
</script>
