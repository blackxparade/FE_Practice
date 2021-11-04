<template>
	<notification>
		<button class="delete" />
		<slot />
	</notification>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Notification from './notification.vue';

export default defineComponent({
	components: { Notification },
});
</script>
