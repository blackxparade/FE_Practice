/* scaffolding-delete-file unless keepExamples */
export default { title: 'widgets / td-modal-card' };

// And entry can either be a Vue template string
// or a full blown Vue component object with template, data, methods, etc.
export const base = () => ({ template: `
	<td-modal-card>
		<template #title>Lorem ipsum</template>

		Ideally all components responsible for the <strong>look and feel</strong> are located
		separately from the <strong>app components</strong>. In this setup they are inside the
		<code>/widgets</code> and stay clear from concepts such as:
		<ul>
			<li class="has-text-weight-bold">- application logic and Vuex</li>
			<li class="has-text-weight-bold">- networking</li>
			<li class="is-italic">- arguably i18n and locales</li>
		</ul>

		<template #foot>
			<button class="button is-primary" @click="active = false">Primary action</button>
			<button class="button" @click="active = false">Cancel</button>
		</template>
	</td-modal-card>
` });
