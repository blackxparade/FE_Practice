/**
 * Prevents an incompatible polyfill breaking JSDOM.
 * See: https://github.com/webcomponents/polyfills/issues/459
 */
if (ShadowRoot.prototype.createElement) {
	throw new Error('This polyfill is now unnecessary. Just delete it!');
}

/** Import any package that includes the problematic polyfill */
const applyPolyfill = () => require('@lion/dialog');

/* Backup the customElements registry of JSDOM */
const originalCustomElements = window.customElements;
/* Trigger the polyfill which swaps it out */
applyPolyfill();
/* Take hold the customElements registry made by the polyfill */
const scopedCustomElements = window.customElements;

/* Reinstate the JSDOM registry with a proxy that:
 * - prefers to return the polyfilled members
 * - but uses the original registry as a fallback */
Object.defineProperty(window, 'customElements', {
	value: new Proxy(originalCustomElements, {
		get: (original, prop) => prop in scopedCustomElements ?
			scopedCustomElements[prop] :
			original[prop],
	}),
	configurable: true,
	writable: true,
});
