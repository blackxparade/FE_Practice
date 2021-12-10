<template>
    <div :class="['notification', 'is-light', notificationType]">
        <!-- i needed to import the whole bulma theme, because if i only imported 'notification', the close button did not appear correctly -->
        <button class="delete"></button>
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