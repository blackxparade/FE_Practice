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
				type="text"
				placeholder="Name"
				@change="printProps"
				@input="$emit('nameChange', $event.target.value)">
			<input
				:value="summary"
				class="input"
				type="text"
				placeholder="Summary"
				@change="printProps"
				@input="$emit('summaryChange', $event.target.value)">
		</template>
		<template #footer>
			<button
				class="button"
				:disabled="(!name.length || !summary.length)"
				@click="$emit('editItem')">
				<slot name="actionButtonLabel" />
			</button>
			<button class="button" @click="$emit('close')">Close</button>
		</template>
	</modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Modal from './modal.vue';

export default defineComponent({
	components: {
		Modal,
	},
	props: {
		name: { type: String, default: '' },
		summary: { type: String, default: '' },
	},
});
</script>

<!-- 1. Add store to modals -->
<!-- 2. Use setup to fill default values -->
<!-- 3. Separate the modals into different modules -->
<!-- 4. Create 3 separable list with all of the functionalities. -->
<!-- 5. Handle the selections in store -->
