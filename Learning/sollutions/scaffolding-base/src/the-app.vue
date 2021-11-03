<template>
	<div class="page container">
		<main class="main section">

			<!-- task-01-asset-item-01 -->
			<asset-item>
				<template v-slot:icon>
					<td-icon :icon="tdExample" />
				</template>
				<template v-slot:name>Bob's plant</template>
				<template v-slot:description>He really likes it.</template>
			</asset-item>

			<br>

			<!-- task-01-asset-item-02 -->
			<asset-item-loc>
				<template v-slot:icon>
					<td-icon :icon="tdExample" />
				</template>
				<template v-slot:name>Main Stock</template>
				<template v-slot:location>
					<a href="http://www.google.com">Stock Room 01</a>
				</template>
			</asset-item-loc>

			<br>

			<!-- task-02-notification-01 -->
			<notification notificationType="is-success">
				You have successfully linked one asset.
			</notification>

			<notification notificationType="is-warning">
				An error occurred while processing your request. Please try again.
			</notification>

			<notification notificationType="is-danger">
				An error occurred while processing your request. Please try again.
			</notification>

			<!-- task-02-notification-02 -->
			<notification-enhanced notificationType="is-success">
				Primar lorem ipsum dolor sit amet, consectetur
  				adipiscing elit lorem ipsum dolor. <strong>Pellentesque risus mi</strong>, tempus quis placerat ut, porta nec nulla. Vestibulum rhoncus ac ex sit amet fringilla. Nullam gravida purus diam, et dictum <a>felis venenatis</a> efficitur.
			</notification-enhanced>

			<!-- task-03-button -->
			<bulma-button modifiers="is-warning is-loading mr-4"></bulma-button>

			<bulma-button modifiers="is-link is-light mr-4">
				    <span class="icon">
						<td-icon :icon="tdExample" />
					</span>
    			<span>Label</span>
			</bulma-button>

			<bulma-button modifiers="is-danger is-outlined">
    			<span>Label</span>
				    <span class="icon">
						<td-icon :icon="tdExample" />
					</span>
			</bulma-button>

			<!-- task-04-modal-01 -->
			<!-- <bulma-modal>
				<template v-slot:title>Modal title</template>
				<template v-slot:content>
					Quisque ante lacus, malesuada ac auctor vitae, congue non ante. Phasellus lacus ex, semper ac tortor nex, fringilla condumentum orci. Fusce eu rutrum tellus.
				</template>
				<template v-slot:button-label>Save changes</template>
			</bulma-modal> -->

			<!-- task-04-modal-02 -->
			<!-- <bulma-modal-enhanced>
				<template v-slot:title>Modal title</template>
				<template v-slot:content>
					Quisque ante lacus, malesuada ac auctor vitae, congue non ante. Phasellus lacus ex, semper ac tortor nex, fringilla condumentum orci. Fusce eu rutrum tellus.
				</template>
				<template v-slot:button-label>Save changes</template>
				<template v-slot:buttons-custom>
					<button class="button">Open Asset</button>
				</template>
			</bulma-modal-enhanced> -->

		</main>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TheMessage from './components/the-message.vue';
import AssetItem from './components/asset-item.vue';
import AssetItemLoc from './components/asset-item-loc.vue';
import Notification from './components/notification.vue';
import NotificationEnhanced from './components/notification-enhanced.vue';
import BulmaButton from './components/bulma-button.vue';
import BulmaModal from './components/bulma-modal.vue';
import BulmaModalEnhanced from './components/bulma-modal-enhanced.vue';
import { tdExample } from './example-font-awesome-icon-pack';

/* scaffolding-enable */
export default defineComponent({
	/* scaffolding-disable unless keepExamples */
	components: { 
		TheMessage, 
		AssetItem, 
		AssetItemLoc, 
		Notification,
		NotificationEnhanced,
		BulmaButton,
		BulmaModal,
		BulmaModalEnhanced
	},
	props: {
		message: { type: String, default: '' }
	},
	setup(props) {
        return {
            tdExample
        };
    }
});
/* scaffolding-disable unless keepExamples */

</script>
