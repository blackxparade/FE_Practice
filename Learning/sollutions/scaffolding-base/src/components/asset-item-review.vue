<template>
	<div class="is-flex is-align-items-center">
		<div class="media-left">
			<td-icon :icon="icon" />
		</div>
		<div class="media-content is-flex is-flex-direction-column ml-4">
			<p class="title is-4 has-text-weight-normal has-text-link">
				<span>{{ name }}</span>
			</p>
			<p class="subtitle is-6">
				<slot name="summary">
					{{ summary }}
				</slot>
			</p>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

// https://frontend.topdesk.com/home/guide/practices/domain-objects.html#the-marketing-pitch
export default defineComponent({
	props: {
		icon: { type: Object, default: () => ({}) },
		name: { type: String, default: '' },
		summary: { type: String, default: '' },
	},

});
</script>
