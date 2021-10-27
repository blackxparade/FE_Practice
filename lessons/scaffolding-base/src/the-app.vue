<template>
	<div class="page container">
		<main class="main section">
		</main>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TheMessage from './components/the-message.vue';

/* scaffolding-enable */
export default defineComponent({
	/* scaffolding-disable unless keepExamples */
	components: { TheMessage },
	props: {
		message: { type: String, default: '' },
	},
});
/* scaffolding-disable unless keepExamples */

</script>
