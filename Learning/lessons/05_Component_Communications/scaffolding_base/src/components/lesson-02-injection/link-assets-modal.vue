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
export default defineComponent({
	inject: ['appId']
});
</script>