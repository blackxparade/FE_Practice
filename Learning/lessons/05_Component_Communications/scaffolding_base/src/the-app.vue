<template>
	<div class="page container">
		<main class="main section">
			<div> {{ message }}</div>
		</main>
	</div>
</template>

<script lang="ts">

import { ref } from 'vue';1

import { defineComponent } from 'vue';
export default defineComponent({
	setup: () => {
		const message = ref('This is the default message')
		return { message };
	},
});

</script>

