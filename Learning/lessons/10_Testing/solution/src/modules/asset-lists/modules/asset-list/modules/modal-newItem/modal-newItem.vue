<template>
	<div>
		<button
			class="button is-primary is-light"
			@click="openNewModal()">
			Add item
		</button>
		<td-modal
		v-if="showNewModal"
		@close="clearCloseNewModal()"
		data-testid="modal-new-item">
			<template #title>
				Add Item
			</template>
			<template #content>
				<input
					v-model="name"
					class="input mb-4"
					type="text"
					placeholder="Name"
					data-testid="modal-new-item-input-name">
				<input
					v-model="summary"
					class="input"
					type="text"
					placeholder="Summary"
					data-testid="modal-new-item-input-summary">
			</template>
			<template #footer>
				<button
					class="button"
					:disabled="(!name.length || !summary.length)"
					data-testid="modal-new-item-button-primary"
					@click="addItemHandler(name, summary)">
					Add
				</button>
				<button class="button" @click="clearCloseNewModal()" data-testid="modal-new-item-button-close">Close</button>
			</template>
		</td-modal>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useNewItemModalStore } from './modal-newItem.store';

export default defineComponent({
	setup() {
		return { ...useNewItemModalStore() };
	}
});
</script>
