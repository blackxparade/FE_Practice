<template>
	<div class="page container">
		<main class="main section">
			<h1> This is a simple demonstration of the counter app</h1>
			<counter />
			<div>
				Here you can see the modified values
				<ul>
					<li>{{ counter }}</li>
					<li>{{ doubleCount }}</li>
					<li>{{ doublePlusOne }}</li>
				</ul>
			</div>
		</main>
	</div>
</template>


<script lang="ts">

import { defineComponent } from 'vue';
import Counter from './components/counter.vue';
import { provideCounterStore } from './store/counter.store';
export default defineComponent({
	components: {
		Counter,
	},
	setup: () => {
		const { doubleCount, doublePlusOne, counter } = provideCounterStore();

		return { doubleCount, doublePlusOne, counter };
	},
});

</script>

