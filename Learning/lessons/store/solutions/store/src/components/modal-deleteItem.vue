<template>
	<modal
	@close="closeModal">
        <template #title>
            Deleting items
        </template>
        <template #content>
            <strong>Are you sure to delete these items?</strong>
            <ul style="margin-top: 1rem;">
                <li v-for="i in selectedItems" :key="i.item.id">
                    {{ listItemInfo(i.item) }}
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
                @click="closeModal()">
                Close
            </button>
        </template>
    </modal>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from 'src/vue-setup';
import Modal from './modal.vue';

export default defineComponent({
	components: {
		Modal
	},
	setup(props) {
		const { state, dispatch, getters } = useStore();
		return {
            showDeleteModal: computed(() => state.showDeleteModal),
			selectedItems: computed(() => getters.selectedItems),
            clearSelections: () => {
                dispatch('clearSelections');
            },
            deleteSelectedItems: () => {
				dispatch('deleteSelectedItems');
			},
			setDeleteModalVisibility: (value: boolean) => {
				dispatch('setDeleteModalVisibility', value);
			},
		};
	},
    data() {
		return {
            name: '',
            summary: '',
		};
	},
	methods: {
        listItemInfo(item: any) { 
			return `${item.id} - ${item.name}, ${item.summary}`; 
		},
		closeModal() {
			this.setDeleteModalVisibility(false);
			this.clearSelections();
		},
		deleteItems() {
			this.deleteSelectedItems();
			this.closeModal();	
		}
	},
});
</script>