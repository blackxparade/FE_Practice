<template>
	<div>Change the counter
		<button class="button" @click="increment()"> Increase</button>
		<button class="button" @click="decrement()"> Decrease</button>
		<button class="button" @click="randomizeCounter()"> Randomize</button>
	</div>
</template>
<script lang="ts">
import { useCounterStore } from '../store/counter.store';
import { defineComponent } from 'vue';

export default defineComponent({
	name: '',
	setup() {
		return {
			...useCounterStore(),
		};
	},
});
</script>
