<template>
		<div class="media-content has-background-grey-light">
			Linked assets widget
            <link-assets-modal
            @showLoader="$emit('showLoader')">
            </link-assets-modal>
		</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import LinkAssetsModal from './link-assets-modal.vue';
export default defineComponent({
    components: {
        LinkAssetsModal
    }
});
</script>