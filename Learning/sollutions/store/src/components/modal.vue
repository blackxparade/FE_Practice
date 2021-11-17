<template>
	<div class="modal is-active">
		<div class="modal-background" />
		<div class="modal-card">
			<header class="modal-card-head">
				<p class="modal-card-title">Add item</p>

				<button class="delete" @click="$emit('close')">
					<span class="sr-only"> Close</span>
				</button>
			</header>
			<section class="modal-card-body">
				<slot name="content">{{ description }}</slot>
				<input 
					class="input mb-4" 
					type="text" 
					placeholder="Name" 
					v-on:keyup="(event) => this.$emit('nameChange', event.target.value)">
				<input 
					class="input" 
					type="text" 
					placeholder="Summary" 
					v-on:keyup="(event) => this.$emit('summaryChange', event.target.value)">
			</section>
			<footer class="modal-card-foot">
				<slot name="footer" />
			</footer>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	props: {
		description: { type: String, default: '' },
	},
});
</script>
