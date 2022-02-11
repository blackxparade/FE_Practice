<template>
	<div>Change the counter</div>
	<button class="button" @click="increment()"> Increase</button>
	<button class="button" @click="decrement()"> Decrease</button>
	<button class="button" @click="randomizeCounter()"> Randomize</button>
</template>
<script lang="ts">
import { useCounterStore } from 'src/store/counter.store';
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
