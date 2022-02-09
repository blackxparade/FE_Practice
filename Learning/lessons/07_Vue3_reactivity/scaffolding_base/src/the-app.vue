<template>
	<div class="page container">
		<main class="main section">
			<!-- <h1> This is a simple demonstration of the counter app</h1>
			<counter />
			<div>
				Here you can see the modified values
				<ul>
					<li>{{ counter }}</li>
					<li>{{ doubleCount }}</li>
					<li>{{ doublePlusOne }}</li>
				</ul>
			</div> -->
			<message></message>
			<reactive-form class="mt-6"></reactive-form>
			<list id="list1" :isMultiSelect="false"></list>
			<list id="list2" :isMultiSelect="true"></list>
		</main>
	</div>
</template>


<script lang="ts">

import { defineComponent } from 'vue';
import Counter from './components/counter.vue';
import Message from './components/message.vue';
import ReactiveForm from './components/reactive-form.vue';
import List from './components/list.vue';
import { provideCounterStore } from './store/counter.store';
export default defineComponent({
	components: {
		Counter,
		Message,
		ReactiveForm,
		List
	},
	setup: () => {
		const { doubleCount, doublePlusOne, counter } = provideCounterStore();
		return { doubleCount, doublePlusOne, counter };
	}
});

</script>

