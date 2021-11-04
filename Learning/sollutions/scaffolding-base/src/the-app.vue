<template>
	<div class="page container">
		<main class="main section">
			<!-- task-01-asset-item-01 -->
			<asset-item>
				<template #icon>
					<td-icon :icon="tdExample" />
				</template>
				<template #name>Bob's plant</template>
				<template #description>He really likes it.</template>
			</asset-item>
			<br>

			<!-- task-01-asset-item-02 -->
			<asset-item-loc>
				<template #icon>
					<td-icon :icon="tdExample" />
				</template>
				<template #name>Main Stock</template>
				<template #location>
					<a href="http://www.google.com">Stock Room 01</a>
				</template>
			</asset-item-loc>

			<h2>Reviewed</h2>
			<br>
			<asset-item-review v-bind="sampleAssetItem" />
			<br>
			<asset-item-review v-bind="sampleAssetItem">
				<template #summary>
					<span>Location: </span> <a href="http://www.google.com">Stock Room 01</a>
				</template>
			</asset-item-review>
			<br>

			<!-- task-02-notification-01 -->
			<notification notification-type="is-success">
				You have successfully linked one asset.
			</notification>

			<notification notification-type="is-warning">
				An error occurred while processing your request. Please try again.
			</notification>

			<notification notification-type="is-danger">
				An error occurred while processing your request. Please try again.
			</notification>

			<h2>Reviewed</h2>

			<notification-reviewed class="is-light is-success">
				You have successfully linked one asset.
			</notification-reviewed>
			<notification-reviewed class="is-light is-warning">
				An error occurred while processing your request. Please try again.
			</notification-reviewed>
			<notification-reviewed class="is-light is-danger">
				An error occurred while processing your request. Please try again.
			</notification-reviewed>
			<notification-reviewed class="is-danger">
				It should be dark
			</notification-reviewed>

			<!-- task-02-notification-02 -->
			<notification-enhanced notification-type="is-success">
				Primar lorem ipsum dolor sit amet, consectetur
				adipiscing elit lorem ipsum dolor. <strong>Pellentesque risus mi</strong>, tempus quis placerat ut, porta nec nulla. Vestibulum rhoncus ac ex sit amet fringilla. Nullam gravida purus diam, et dictum <a>felis venenatis</a> efficitur.
			</notification-enhanced>

			<h2>Reviewed</h2>
			<notification-enhanced-reviewed class="is-success">
				Primar lorem ipsum dolor sit amet, consectetur
				adipiscing elit lorem ipsum dolor. <strong>Pellentesque risus mi</strong>, tempus quis placerat ut, porta nec nulla. Vestibulum rhoncus ac ex sit amet fringilla. Nullam gravida purus diam, et dictum <a>felis venenatis</a> efficitur.
			</notification-enhanced-reviewed>
			<notification-enhanced-reviewed class="is-warning">
				Primar lorem ipsum dolor sit amet, consectetur
				adipiscing elit lorem ipsum dolor. <strong>Pellentesque risus mi</strong>, tempus quis placerat ut, porta nec nulla. Vestibulum rhoncus ac ex sit amet fringilla. Nullam gravida purus diam, et dictum <a>felis venenatis</a> efficitur.
			</notification-enhanced-reviewed>

			<!-- task-03-button -->
			<bulma-button class="is-warning is-loading mr-4" />

			<bulma-button class="is-link is-light mr-4" @click="showModal = true">
				<span class="icon">
					<td-icon :icon="tdExample" />
				</span>
				<span>Label</span>
			</bulma-button>

			<bulma-button class="is-danger is-outlined" @click="showEnhancedModal = true">
				<span>Label</span>
				<span class="icon">
					<td-icon :icon="tdExample" />
				</span>
			</bulma-button>

			<!-- task-04-modal-01 -->
			<bulma-modal v-if="showModal" @close="showModal = false">
				<template #title>Modal title</template>
				<template #content>
					Quisque ante lacus, malesuada ac auctor vitae, congue non ante. Phasellus lacus ex, semper ac tortor nex, fringilla condumentum orci. Fusce eu rutrum tellus.
				</template>
				<template #button-label>Save changes</template>
			</bulma-modal>

			<!-- task-04-modal-02 -->
			<bulma-modal-enhanced v-if="showEnhancedModal" @close="showEnhancedModal = false">
				<template #title>Modal title</template>
				<template #content>
					Quisque ante lacus, malesuada ac auctor vitae, congue non ante. Phasellus lacus ex, semper ac tortor nex, fringilla condumentum orci. Fusce eu rutrum tellus.
				</template>
				<template #button-label>Save changes</template>
				<template #buttons-custom>
					<button class="button">Open Asset</button>
				</template>
			</bulma-modal-enhanced>
		</main>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TheMessage from './components/the-message.vue';
import AssetItem from './components/asset-item.vue';
import AssetItemReview from './components/asset-item-review.vue';
import AssetItemLoc from './components/asset-item-loc.vue';
import Notification from './components/notification.vue';
import NotificationReviewed from './components/notification-reviewed.vue';
import NotificationEnhanced from './components/notification-enhanced.vue';
import BulmaButton from './components/bulma-button.vue';
import BulmaModal from './components/bulma-modal.vue';
import BulmaModalEnhanced from './components/bulma-modal-enhanced.vue';
import { tdExample } from './example-font-awesome-icon-pack';
import NotificationEnhancedReviewed from './components/notification-enhanced-reviewed.vue';

/* scaffolding-enable */
export default defineComponent({
	/* scaffolding-disable unless keepExamples */
	components: {
		TheMessage,
		AssetItem,
		AssetItemReview,
		AssetItemLoc,
		Notification,
		NotificationEnhanced,
		BulmaButton,
		BulmaModal,
		BulmaModalEnhanced,
		NotificationReviewed,
		NotificationEnhancedReviewed,
	},
	props: {
		message: { type: String, default: '' },
	},
	setup(props) {
		const sampleAssetItem = { name: 'Item 1', summary: 'Item summary', icon: tdExample, type: 'this is type' };
		return {
			tdExample,
			sampleAssetItem,
		};
	},
	data() {
    	return {
			showModal: false,
			showEnhancedModal: false,
		};
  	},
});
/* scaffolding-disable unless keepExamples */

</script>
