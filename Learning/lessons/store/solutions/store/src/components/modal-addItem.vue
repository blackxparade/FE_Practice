<template>
    <modal>
        <template #title>
            Add item
        </template>
        <template #content>
            <!-- how to change parent component's value from here in a nice way (name and summary) -->
            <input
                :value="this.name"
                class="input mb-4"
                type="text"
                placeholder="Name"
                @change="printProps"
                @input="$emit('nameChange', $event.target.value)">
            <input
                :value="this.summary"
                class="input"
                type="text"
                placeholder="Summary"
                @change="printProps"
                @input="$emit('summaryChange', $event.target.value)">
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
import Modal from './modal.vue';

export default defineComponent({
	props: {
		name: { type: String, default: '' },
        summary: { type: String, default: '' },
	},
    components: {
		Modal,
	},
    methods: {
        printProps() {
            console.log(`Name: ${this.name}, summary: ${this.summary}`);
        },
    },
});
</script>