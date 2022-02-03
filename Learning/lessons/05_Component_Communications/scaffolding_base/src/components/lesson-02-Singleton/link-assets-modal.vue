<template>
		<div class="media-content has-background-grey has-text-white-bis">
			Linked assets modal
            <br>
            {{ appId }}
            <br>
            <button
            @click="$emit('showLoader')">
                Pass info to app.vue
            </button>
		</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { appSingleton } from './app-singleton';
export default defineComponent({
	data: {
		app1: appSingleton.appId,
	},
	inject: ['appId']
});
</script>
