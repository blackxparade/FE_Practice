<template>
	<div class="page container">
		<main class="main section">
		</main>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { tdExample } from './example-font-awesome-icon-pack';

/* scaffolding-enable */
export default defineComponent({
	/* scaffolding-disable unless keepExamples */
	components: {
		TheMessage,
	},
	props: {
		message: { type: String, default: '' },
	},
	setup(props) {
		return { tdExample };
	},
	data() {
    	return {
			showModal: false,
			showEnhancedModal: false,
		};
  	},
});
/* scaffolding-disable unless keepExamples */

</script>
