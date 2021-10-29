<template>
    <div class="is-flex is-align-items-center">
        <div class="media-left">
            <td-icon icon="add-32" />
        </div>
        <div class="media-content is-flex is-flex-direction-column ml-4">
            <p class="title is-4 has-text-weight-normal has-text-primary">
                <slot name="title"></slot>
            </p>
            <p class="subtitle is-6">
               <slot name="subtitle"></slot>
            </p>
        </div>
    </div>
</template>

<script lang="ts">
import tdIcon from 'src/widgets/td-icon.vue';
import { defineComponent } from 'vue';

export default defineComponent({
    components: { tdIcon },
});
</script>