<template>
		<div class="media-content is-flex is-flex-direction-column">
			<div class="title 
			is-4 
			has-text-weight-normal 
			has-text-link"
			style="display: flex; gap: .5rem;">
				<input type="checkbox" :id='id'>
				<label :for='id'>{{ id }} - {{ name }}</label>
			</div>
			<p class="subtitle is-6">
				<slot name="summary">
					{{ summary }}
				</slot>
			</p>
		</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
	props: {
		id: { type: String, default: 'id' },
		name: { type: String, default: 'name' },
		summary: { type: String, default: 'summary' },
	},
});
</script>