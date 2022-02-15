<template>
	<modal
	@close="closeModal">
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
                @click="closeModal()">
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
	setup(props) {

		return {
            ...useModalStore(),
            ...useAssetListStore()
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
		},
		deleteItems() {
			this.deleteSelectedItems();
			this.closeModal();	
		}
	},
});
</script>