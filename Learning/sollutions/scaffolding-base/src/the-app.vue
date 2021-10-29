<template>
	<div class="page container">
		<main class="main section">
			<asset-item>
				<template v-slot:title>Bob's plant</template>
				<template v-slot:subtitle>He really likes it.</template>
			</asset-item>
		</main>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TheMessage from './components/the-message.vue';
import AssetItem from './components/asset-item.vue';

/* scaffolding-enable */
export default defineComponent({
	/* scaffolding-disable unless keepExamples */
	components: { TheMessage, AssetItem },
	props: {
		message: { type: String, default: '' }
	}
});
/* scaffolding-disable unless keepExamples */

</script>
