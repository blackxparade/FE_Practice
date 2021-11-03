<template>
    <button :class="['button', modifiers]">
        <slot>Default</slot>
    </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({ 
    props: {
        modifiers: String
    }
});
</script>