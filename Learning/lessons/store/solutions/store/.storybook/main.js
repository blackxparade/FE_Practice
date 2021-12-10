// The 'main.js' is responsible finding stories, declaring addons, and other general setup
// Read mode: https://medium.com/storybookjs/declarative-storybook-configuration-49912f77b78
module.exports = {
	stories: [
		'../src/**/*.stories.js',
		'./**/*.stories.js',
	],
	addons: [
		'@storybook/addon-essentials',
		'@storybook/addon-a11y',
	],
	core: { builder: 'webpack5' },
};
