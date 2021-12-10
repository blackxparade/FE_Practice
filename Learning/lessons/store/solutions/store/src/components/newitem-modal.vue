<template>
	<div class="modal is-active">
		<div class="modal-background" />
		<div class="modal-card">
			<header class="modal-card-head">
				<p class="modal-card-title">
					{{ title }}
				</p>
				<button class="delete">
					<span class="sr-only"> Close</span>
				</button>
			</header>
			<section class="modal-card-body">
				<slot name="content">{{ description }}</slot>
			</section>
			<footer :class="['modal-card-foot', extraFooterClasses]">
				<slot name="footer" />
			</footer>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	props: {
		title: { type: String, default: '' },
		description: { type: String, default: '' },
		extraFooterClasses: { type: String, default: '' },
	},
});
</script>
