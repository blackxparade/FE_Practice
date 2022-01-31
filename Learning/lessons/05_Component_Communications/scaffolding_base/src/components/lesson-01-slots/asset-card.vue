<template>
		<div class="media-content has-background-grey-lighter">
			Asset card
            <br>
            App ID:
            <slot name="appId">No appId</slot>
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
});
</script>