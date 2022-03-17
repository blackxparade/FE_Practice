<template>
	<div class="page container">
		<main class="main section">
			<asset-lists />
		</main>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { AssetLists } from './modules/asset-lists';

/* scaffolding-enable */
export default defineComponent({
	/* scaffolding-disable unless keepExamples */
	components: {
		AssetLists
	}
});
</script>
