<!-- scaffolding-delete-file unless keepExamples -->
<template>
	<lion-dialog
		:opened="!!message"
		v-bind="$attrs"
		:config="{ hidesOnEsc: false }"
		@opened-changed="emitDismiss">
		<template #content>
			<td-modal-card @keydown.esc="dismissMessage">
				<template #title>Hey</template>

				<div data-testid="modal-message">{{ message }}</div>

				<template #foot>
					<button class="button is-primary" @click="dismissMessage">Noted</button>
					<button data-testid="show-joke" class="button" @click="loadJoke">Show a joke instead</button>
				</template>
			</td-modal-card>
		</template>
	</lion-dialog>
</template>

<script lang="ts">
import { LionDialog } from '@lion/dialog';
import { useStore } from 'src/vue-setup';
import { computed, defineComponent } from 'vue';

export default defineComponent({
	emits: ['dismiss'],
	setup(_, { emit }) {
		const { state, dispatch } = useStore();

		const emitDismiss = ({ target }: { target: LionDialog }) => {
			if (target.opened) { return; }
			emit('dismiss');
		};

		return {
			message: computed(() => state.message),
			dismissMessage: () => dispatch('dismissMessage'),
			loadJoke: () => dispatch('loadJoke'),
			emitDismiss,
		};
	},
});
</script>
