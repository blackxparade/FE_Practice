<template>
		<div class="media-content is-flex is-flex-direction-column has-background-white-ter">
			Overview
            <asset-card
            @showLoader="$emit('showLoader')">
            </asset-card>
		</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AssetCard from './asset-card.vue';
export default defineComponent({
    components: {
        AssetCard
    }
});
</script>