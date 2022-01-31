<template>
		<div class="media-content is-flex is-flex-direction-column has-background-white-ter">
			Overview
            <asset-card
            :appId="appId"
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
    },	
    data() {
		return {
			appId: 'fdsDGDc44d#$d'
		}
	},
	methods: {
		showLoader() {
			alert("show global loader");
		}
	}
});
</script>