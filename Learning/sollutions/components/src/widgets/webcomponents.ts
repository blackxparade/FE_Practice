import { ComponentObjectPropsOptions, defineComponent, h, Slots, VNode } from 'vue';

/**
 * Converts a web component to a Vue component
 *
 * Incubated here for now. Once it's API is stable the intention is to open-source it.
 * */
export function toVueComponent(CustomElement: CustomElementConstructor, {
	name = CustomElement.name,
	props,
	class: className = hyphenate(name),
	allowUndefinedProps = false,
}: ToVueComponentOptions = {}) {
	const { scopedTag, ScopedElement } = _initElement(CustomElement, name);
	const _props = props ?? toVuePropOptions(customPropsOf(ScopedElement));
	const filterProps = filterObject(isAllowedProp(allowUndefinedProps));
	return defineComponent({
		name,
		props: _props,
		setup: (props, { slots }) => () => h(scopedTag, { ...filterProps(props), class: className }, toNativeSlots(slots)),
	});
}

type ToVueComponentOptions = {
	/** Name of the Vue component in CamelCase format */
	name?: string;
	/** Additional class(es) on the wrapped component for theming. The kebab-case name by default. */
	class?: string;
	/** Props of the resulting Vue component. Defaults to all custom props with a dynamic get and set. */
	props?: ComponentObjectPropsOptions;
	/** Explicitly allow some or all props to pass undefined values to the wrapped component. False by default. */
	allowUndefinedProps?: string[] | boolean;
}

/** Ensures the custom element is ready to be wrapped by sub-classing, registering, and triggering any lazy init */
export function _initElement(CustomElement: CustomElementConstructor, name: string) {
	class ScopedElement extends CustomElement {}
	/* Register custom element with a scoped tag */
	const scopedTag = toUniqueTag(hyphenate(name));
	customElements.define(scopedTag, ScopedElement);
	/* Trigger any init hooks for example LitElement uses that may mutate the element prototype chain */
	document.createElement(scopedTag);
	return { scopedTag, ScopedElement };
}

/**
 * Returns custom properties declared on top of a webcomponent.
 * A prop is recognized by having both a dynamic get and set method.
 * */
function customPropsOf(Constructor: CustomElementConstructor): string[] {
	if (!Constructor.prototype || HTMLElement === Constructor || Constructor.name === 'HTMLElement') { return []; }
	const hasGetAndSet = ([/**/, { get, set }]: [string, PropertyDescriptor]) => !!get && !!set;
	const isPublic = (prop: string) => !prop.startsWith('_');
	const props = Object.entries(Object.getOwnPropertyDescriptors(Constructor.prototype))
			.filter(hasGetAndSet)
			.map(([prop]) => prop)
			.filter(isPublic);
	return [...props, ...customPropsOf(Object.getPrototypeOf(Constructor))];
}

function toVuePropOptions(props: string[]) {
	return Object.fromEntries(props.map(prop => [prop, {}]));
}

function isAllowedProp(allowUndefinedProps?: string[] | boolean) {
	return (prop: string, value: unknown) => {
		if (value !== undefined) { return true; }
		if (!Array.isArray(allowUndefinedProps)) { return !!allowUndefinedProps; }
		return allowUndefinedProps.includes(prop);
	};
}

function toNativeSlots(slots: Slots) {
	return Object.entries(slots)
			.flatMap(([slot, nodes]) => {
				if (nodes === undefined) { return []; }
				if (slot === 'default') { return nodes(); }
				return nodes().map(withSlot(slot));
			});
}

function withSlot(slot: string): <T extends VNode>(vnode: T) => T {
	return vnode => ({ ...vnode, props: { ...vnode.props, slot } });
}

/** Behavior matches from @open-wc/scoped-elements */
let counter = Math.round(Math.random() * 100000);
function toUniqueTag(tag: string) {
	return `${tag}-${counter++}`;
}

function hyphenate(string: string) {
	const hyphenateRE = /\B([A-Z])/g;
	return string.replace(hyphenateRE, '-$1').toLowerCase();
}

function filterObject(predicate: (prop: string, value: unknown) => boolean) {
	return (object: Record<string, unknown>) => Object.fromEntries(Object.entries(object)
			.filter(([prop, value]) => predicate(prop, value)));
}
