<template>
	<div class="page container">
		<main class="main section">
			<h1 class="title">Lesson 01</h1>
			<app-with-events></app-with-events>
			<app-with-slots></app-with-slots>
			<h1 class="title">Lesson 02</h1>
			<l2-app-with-events></l2-app-with-events>
			<l2-app-with-slots></l2-app-with-slots>
		</main>
	</div>
</template>

<script lang="ts">

import { ref } from 'vue';
import { defineComponent } from 'vue';
import AppWithEvents from './components/lesson-01-events/app-with-events.vue';
import AppWithSlots from './components/lesson-01-slots/app-with-slots.vue';
import L2AppWithEvents from './components/lesson-02-events/l2-app-with-events.vue';
import L2AppWithSlots from './components/lesson-02-slots/l2-app-with-slots.vue';
export default defineComponent({
	components: {
		AppWithEvents,
		AppWithSlots,
		L2AppWithEvents,
		L2AppWithSlots
	},
	setup: () => {
		const message = ref('This is the default message')
		return { message };
	},
	data() {
		return {
			isShowLoader: false
		}
	},
	methods: {
		showLoader() {
			this.isShowLoader = !this.isShowLoader;
		}
	},
});

</script>
