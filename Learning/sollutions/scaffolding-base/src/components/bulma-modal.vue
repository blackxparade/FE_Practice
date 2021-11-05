<template>
    <div class="modal">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">
                    {{ title }}
                </p>
                <button class="delete" aria-label="close"></button>
            </header>
            <section class="modal-card-body">
                <slot name="content">{{ description }}</slot>
            </section>
            <footer :class="['modal-card-foot', extraFooterClasses]">
                <button class="button is-success">
                    {{ primaryButtonLabel }}
                </button>
                <button class="button">
                    {{ secondaryButtonLabel }}
                </button>
                <slot name="extra-buttons"/>
            </footer>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({ 
    props: {
        title: {type: String, default: ''},
        description: {type: String, default: ''},
        primaryButtonLabel: {type: String, default: 'Primary'},
        secondaryButtonLabel: {type: String, default: 'Secondary'},
        extraFooterClasses: {type: String, default: ''}
    }
});
</script>