<template>
		<div class="media-content has-background-grey-lighter">
			Asset card
            <linked-asset-widget
            @showLoader="$emit('showLoader')">
                <template #appId>
                    <slot name="appId">No appId</slot>
                </template>
            </linked-asset-widget>
		</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import LinkedAssetWidget from './linked-asset-widget.vue';
export default defineComponent({
    components: {
        LinkedAssetWidget
    }
});
</script>