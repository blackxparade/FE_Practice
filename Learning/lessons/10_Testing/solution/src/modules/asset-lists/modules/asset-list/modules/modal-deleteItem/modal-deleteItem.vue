<template>
	<td-modal
    v-if="showDeleteModal"
	@close="closeDeleteModal()">
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
                @click="closeDeleteModal()">
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
