<template>
	<div class="page container">
		<main class="main section">
			<asset-item>
				<template v-slot:icon>
					<td-icon :icon="tdExample" />
				</template>
				<template v-slot:name>Bob's plant</template>
				<template v-slot:description>He really likes it.</template>
			</asset-item>
			<br>
			<asset-item-loc>
				<template v-slot:icon>
					<td-icon :icon="tdExample" />
				</template>
				<template v-slot:name>Main Stock</template>
				<template v-slot:location>
					<a href="http://www.google.com">Stock Room 01</a>
				</template>
			</asset-item-loc>
		</main>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TheMessage from './components/the-message.vue';
import AssetItem from './components/asset-item.vue';
import AssetItemLoc from './components/asset-item-loc.vue';
import { tdExample } from './example-font-awesome-icon-pack';

/* scaffolding-enable */
export default defineComponent({
	/* scaffolding-disable unless keepExamples */
	components: { TheMessage, AssetItem, AssetItemLoc },
	props: {
		message: { type: String, default: '' }
	},
	setup(props) {
        return {
            tdExample
        };
    }
});
/* scaffolding-disable unless keepExamples */

</script>
