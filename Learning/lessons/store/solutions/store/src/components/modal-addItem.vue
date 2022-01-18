<template>
    <modal>
        <template #title>
            Add item
        </template>
        <template #content>
            <input
                v-model="name"
                class="input mb-4"
                type="text"
                placeholder="Name">
            <input
                v-model="summary"
                class="input"
                type="text"
                placeholder="Summary">
        </template>
        <template #footer>
            <button
                class="button"
                :disabled="(!name.length || !summary.length)"
                @click="$emit('addItem')">
                Add
            </button>
            <button class="button" @click="$emit('close')">Close</button>
        </template>
    </modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Modal from 'modal.vue';

export default defineComponent({
	props: {
		name: { type: String, default: '' },
        summary: { type: String, default: '' },
	},
    components: {
		Modal,
	},
});
</script>