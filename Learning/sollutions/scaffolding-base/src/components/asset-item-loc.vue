<template>
    <div class="is-flex is-align-items-center">
        <div class="media-left">
            <slot name="icon"></slot>
        </div>
        <div class="media-content is-flex is-flex-direction-column ml-4">
            <p class="title is-4 has-text-weight-normal has-text-link">
                <slot name="name"></slot>
            </p>
            <p class="subtitle is-6">
               Location: <span class="has-text-link"><slot name="location"></slot></span>
            </p>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({});
</script>