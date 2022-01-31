<template>
	<div class="page container">
		<main class="main section">
			<app-with-events></app-with-events>
			<app-with-slots></app-with-slots>
		</main>
	</div>
</template>

<script lang="ts">

import { ref } from 'vue';
import { defineComponent } from 'vue';
import AppWithEvents from './components/events/app-with-events.vue';
import AppWithSlots from './components/slots/app-with-slots.vue';
export default defineComponent({
	components: {
		AppWithEvents,
		AppWithSlots
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
