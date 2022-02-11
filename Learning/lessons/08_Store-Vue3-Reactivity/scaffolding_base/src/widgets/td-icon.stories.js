import { library } from '@fortawesome/fontawesome-svg-core';
import TdIcon from './td-icon';

export default { title: 'widgets / td-icon', component: TdIcon };

// An example FontAwesome icon definition
const play = {
	prefix: 'td',
	iconName: 'play',
	icon: [512, 512, [], 'f005', 'M136 48.154L496 256L136 463.846L136 48.154'],
};
library.add(play);

import { tdExample } from '../example-font-awesome-icon-pack';
// The Template is a reusable function that takes two args and returns
// the story as a Vue component object. With Vue.js there is
// no need to do anything the first arg, the props.
// Instead story derives its props from the keys of argTypes,
// which includes everything passed as the .args
const Template = args => ({
	template: `
		<td-icon :icon="icon" :size="size" :mask="mask" :transform="transform" :spin="spin" />
	`,
	setup: () => args,
	// setup: () => { return { 'icon': play, 'size': '1x', mask: '', transform: '', spin: false }; },
});

// Conventionally, there is a "base" story using the most basic args.
// The "Template.bind({})" bit essentially clones the Template function
// This is necessary, because the next line mutates the clone with the
// Args dedicated for this story.
// This practice allows reusing the same template and other story's args.
export const base = Template.bind({});
base.args = { icon: play, size: '1x', mask: '', transform: '', spin: false };

// A story can reuse another one, usually the base to focus on args that make it special
export const iconByName = Template.bind({});
iconByName.args = { ...base.args, icon: 'play' };


export const importedIcon = Template.bind({});
importedIcon.args = { ...base.args, icon: tdExample };

export const size = Template.bind({});
size.args = { ...base.args, size: '2x' };

// FontAwesome also supports combining existing icons to new forms
export const mask = Template.bind({});
mask.args = { ...base.args, mask: play, transform: 'shrink-8 rotate-180', size: '3x' };

// The spin of commonly used to turn an icon into a loading indicator
export const spin = Template.bind({});
spin.args = { ...mask.args, spin: true };
