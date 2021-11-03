<template>
    <div :class="['notification', 'is-light', notificationType]">
        <slot></slot>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({ 
    props: {
        notificationType: String
    }
});
</script>