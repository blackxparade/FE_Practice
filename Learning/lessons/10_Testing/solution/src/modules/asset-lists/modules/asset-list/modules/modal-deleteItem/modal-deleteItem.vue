<template>
	<td-modal
    v-if="showDeleteModal"
	@close="closeDeleteModal()" data-testid="modal-delete-item">
        <template #title>
            Deleting items
        </template>
        <template #content>
            <strong>Are you sure to delete these items?</strong>
            <ul style="margin-top: 1rem;">
                <li v-for="item in getEverySelected" :key="item.id" data-testid="deletable-items-list">
                    {{ listItemInfo(item) }}
                </li>
            </ul>
        </template>
        <template #footer>
            <button class="button" @click="delItems()" data-testid="delete-items-button">
                Delete
            </button>
            <button
                class="button" @click="closeDeleteModal()" data-testid="close-button">
                Close
            </button>
        </template>
    </td-modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useDeleteItemModalStore } from './modal-deleteItem.store';

export default defineComponent({
	setup() {
		const listItemInfo = (item: any) => {
				return `${item.id} - ${item.name}, ${item.summary}`;
		};
		const { closeDeleteModal, showDeleteModal, deleteItems, getEverySelected } = useDeleteItemModalStore();
		const delItems = () => {
				deleteItems();
                closeDeleteModal();
		};
		return {
			listItemInfo,
			delItems,
			closeDeleteModal,
            showDeleteModal,
            getEverySelected
		};
	},
});
</script>
