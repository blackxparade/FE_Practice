<template>
		<div class="media-content has-background-grey-lighter">
			Asset card
            <linked-asset-widget
            :appId="appId"
            @showLoader="$emit('showLoader')">
            </linked-asset-widget>
		</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import LinkedAssetWidget from './linked-asset-widget.vue';
export default defineComponent({
    components: {
        LinkedAssetWidget
    },
    props: {
        appId: {type: String, default: ''}
    }
});
</script>