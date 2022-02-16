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
import { useModalStore } from 'src/modules/modal.store';
import { useAssetListStore } from 'src/modules/asset-list.store';
import Modal from './modal.vue';

export default defineComponent({
	components: {
		Modal
	},
	setup() {
		const listItemInfo = (item: any) => {
				return `${item.id} - ${item.name}, ${item.summary}`;
		};
		const { closeModal, setDeleteModalVisibility } = useModalStore()
		const { deleteSelectedItems } = useAssetListStore()
		const deleteItems = () => {
				deleteSelectedItems();
				closeModal();
		};

		return {
			listItemInfo,
			deleteItems,
			setDeleteModalVisibility,
		};
	},
});
</script>
