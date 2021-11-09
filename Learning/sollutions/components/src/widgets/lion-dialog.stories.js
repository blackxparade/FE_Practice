import { ref } from 'vue';

/* scaffolding-delete-file unless keepExamples */
export default {
	title: 'widgets / lion-dialog',
	// Used refine or extend args the stories use
	argTypes: {
		// This is available as Vue a event handler in the template
		// When it triggers and the Actions tab in Storybook show the event
		onOpenedChanged: { action: 'opened-changed' },
	},
};

// Letting the app control the opened state
export const base = args => ({
	template: `<div>
		<button @click="opened = true">Open</button>
		<lion-dialog :opened="opened" :config="{ hidesOnEsc: false }" @opened-changed="onOpenedChanged">
			<template #content>
				<div @keydown.esc="opened = false">
					Dialog content
					<button @click="opened = false">x</button>
				</div>
			</template>
		</lion-dialog>
	</div>`,
	setup: () => ({ ...args, opened: ref(false) }),
});

// Letting the dialog control the opened state
export const invoker = args => ({
	template: `<lion-dialog>
		<template #invoker>
			<button>Open</button>
		</template>
		<template #content>
			<div>
				Dialog content
				<button @click="closeOverlay">x</button>
			</div>
		</template>
	</lion-dialog>`,
	setup: () => ({
		...args,
		closeOverlay({ target }) {
			// Lion Components listen to native DOM events
			target.dispatchEvent(new Event('close-overlay', { bubbles: true }));
		},
	}),
});
