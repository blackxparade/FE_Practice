<template>
    <div class="modal is-active">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">
                    <slot name="title">Title</slot>
                </p>
                <button class="delete" aria-label="close"></button>
            </header>
            <section class="modal-card-body">
                <slot name="content">Content</slot>
            </section>
            <footer class="modal-card-foot">
                <button class="button is-success">
                    <slot name="button-label">Label</slot>
                </button>
                <button class="button">Cancel</button>
            </footer>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({ });
</script>