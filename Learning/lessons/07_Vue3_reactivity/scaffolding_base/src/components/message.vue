<template>
	<div>
        Message: {{ message }}
        <br>
        Personalized message: {{ personalizedMessage }}
        <br>
        <input
        v-model="message"
        class="input"
        type="text"
        placeholder="Change message here">
        <br>
        <div 
        v-if="showNotification"
        class="notification is-success mt-6">
            Hello!!
        </div>
	</div>
</template>
<script lang="ts">

import { defineComponent, ref, watchEffect, computed } from 'vue';

export default defineComponent({

	setup() {
        const message = ref("");
        const personalizedMessage = computed(() => "Hello " + message.value);
        const showNotification = ref(false);
        watchEffect(() => {
            if (personalizedMessage.value === "Hello World") {
                showNotification.value = true;
            } else {
                showNotification.value = false;
            }
        });
        return {
            message,
            personalizedMessage,
            showNotification
	    }
    }
});
</script>
