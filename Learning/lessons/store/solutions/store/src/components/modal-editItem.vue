<template>
	<modal
	@close="closeModal">
		<template #title>
			Edit item
		</template>
		<template #content>
			<input
				v-model="this.item.name"
				class="input mb-4"
				type="text"
				placeholder="Name">
			<input
				v-model="item.summary"
				class="input"
				type="text"
				placeholder="Summary">
		</template>
		<template #footer>
			<button
				class="button"
				:disabled="(!item.name.length || !item.summary.length)"
				@click="editItem()">
				Edit
			</button>
			<button class="button" @click="closeModal()">Close</button>
		</template>
	</modal>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from 'src/vue-setup';
import Modal from './modal.vue';

export default defineComponent({
	components: {
		Modal,
	},

	setup(props) {
		const { state, dispatch, getters } = useStore();
		return {
			showEditModal: computed(() => state.showEditModal),
			selectedItems: computed(() => getters.selectedItems),
			updateItem: (id: number, name: string, summary: string) => {
				dispatch('updateItem', { id, name, summary });
			},
			setEditModalVisibility: (value: boolean) => {
				dispatch('setEditModalVisibility', value);
			},
		};
	},
	data() {
		return {
			item: {
				id: 0,
				name: '',
				summary: '',
			}
		};
	},
	created: function () {
		// Object.assign(target, source) was used here bc else i got runtime errors
		// saying dont mutate a vuex object. -> with a simple = it created a reference
		// but now it copis the object data to this.item.
    	this.item = Object.assign({}, this.selectedItems[0].item);
  	},
	methods: {
		closeModal() {
			this.setEditModalVisibility(false);
		},
		editItem() {
			this.updateItem(this.item.id, this.item.name, this.item.summary);
			this.closeModal();	
		},
	},
});
</script>