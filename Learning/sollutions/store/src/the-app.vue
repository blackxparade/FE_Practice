<template>
	<div class="page container">
		<main class="main section">
			<div style="display: flex; gap: .5rem;">
				<button class="button is-primary is-light" @click="showModal = true;">Add item</button>
				<button class="button is-light">Edit</button>
				<button class="button is-danger is-light">Delete</button>
			</div>

			<div style="display: flex; flex-direction: column; gap: 1rem; margin-top: 1rem;">
				<item
					v-for="item in items"
					:key="item.id"
					v-bind="item" />
			</div>

			<modal
				v-if="showModal"
				@nameChange="(value) => { name = value }"
				@summaryChange="(value) => { summary = value }"
				@close="showModal = false">
				<template #footer>
					<button
						class="button"
						:disabled="(!name.length || !summary.length)"
						@click="() => { dispatchItem(name, summary); testsummary(); }">
						Add
					</button>
					<button class="button" @click="showModal = false">Close</button>
				</template>
			</modal>
		</main>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from 'src/vue-setup';
import Item from './components/item.vue';
import Modal from './components/modal.vue';

/* scaffolding-enable */
export default defineComponent({
	/* scaffolding-disable unless keepExamples */
	components: {
		Item,
		Modal,
	},
	setup(props) {
		const { state, dispatch } = useStore();
		return {
			items: computed(() => state.items),
			dispatchItem: (name: string, summary: string) => {
				dispatch('addNewItem', { name: name, summary: summary });
			},
		};
	},
	data() {
		return {
			showModal: false,
			name: '',
			summary: '',
		};
	},
	methods: {
		testsummary() {
			this.name = '';
			this.summary = '';
			this.showModal = false;
			return ;
		},
	},
});
/* scaffolding-disable unless keepExamples */

</script>
