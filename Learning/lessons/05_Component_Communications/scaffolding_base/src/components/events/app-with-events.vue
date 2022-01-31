<template>
	<div class="page container">
		<main class="main section">
			<h1 class="title">App with events</h1>
			<progress class="progress is-small is-primary" max="100"
			v-if="isShowLoader">
			15%
			</progress>
			<overview
			@showLoader="showLoader()">
			</overview>
		</main>
	</div>
</template>

<script lang="ts">

import { defineComponent } from 'vue';
import Overview from './overview.vue';
export default defineComponent({
	components: {
		Overview
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
