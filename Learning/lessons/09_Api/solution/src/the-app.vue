<template>
	<div class="page container">
		<main class="main section">
			<asset-lists-container />
		</main>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AssetListsContainer from './modules/asset-lists-container/asset-lists-container.vue';

/* scaffolding-enable */
export default defineComponent({
	/* scaffolding-disable unless keepExamples */
	components: {
		AssetListsContainer
	}
});
</script>
