<template>
	<modal>
		<template #title>
			<slot name="title" />
		</template>
		<template #content>
			<!-- how to change parent component's value from here in a nicer way (name and summary) -->
			<input
				:value="name"
				class="input mb-4"
				id="Name"
				type="text"
				placeholder="Name"
				@input="$emit('inputChange', inputChange($event.target))">
			<input
				:value="summary"
				class="input"
				id="Summary"
				type="text"
				placeholder="Summary"
				@input="$emit('inputChange', inputChange($event.target))">
		</template>
		<template #footer>
			<button
				class="button"
				:disabled="(!name.length || !summary.length)"
				@click="changeAction()">
				<slot name="actionButtonLabel" />
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
		const { state, dispatch } = useStore();
		return {
			showNewModal: computed(() => state.showNewModal),
			showEditModal: computed(() => state.showNewModal),
			dispatchItem: (name: string, summary: string) => {
				dispatch('addNewItem', { name, summary });
			},
			updateItem: (id: number, name: string, summary: string) => {
				dispatch('updateItem', { id, name, summary });
			},
			setNewModalVisibility: (value: boolean) => {
				dispatch('setNewModalVisibility', value);
			},
			setEditModalVisibility: (value: boolean) => {
				dispatch('setEditModalVisibility', value);
			},
		};
	},
	props: {
		isEditMode: {type: Boolean, default: false},
		id: {type: Number, default: -1 },
		name: { type: String, default: '' },
		summary: { type: String, default: '' },
	},
	methods: {
		closeModal() {
			if (this.isEditMode) {
				this.setEditModalVisibility(false);
			} else {
				this.setNewModalVisibility(false);
			}
			this.$emit('modalClose');
		},
		changeAction() {
			if (this.isEditMode) {
				this.updateItem(this.id, this.name, this.summary);
			} else {
				this.dispatchItem(this.name, this.summary);
			}
			this.closeModal();	
		},
		inputChange(targetValue: HTMLInputElement): any {
			if (targetValue.id === "Name") {
				return {
					name: targetValue.value,
					summary: this.summary
				}
			}
			if (targetValue.id === "Summary") {
				return {
					name: this.name,
					summary: targetValue.value
				}
			}
		}
	},
});
</script>