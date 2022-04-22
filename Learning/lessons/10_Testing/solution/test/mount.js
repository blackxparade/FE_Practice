import TdModal  from 'src/components/td-modal.vue';

const widgetComponents = [ TdModal ]

function registerWidgets() {
	return (Vue) => {
		widgetComponents.forEach((widget) => {
			Vue.component(widget.name, widget);
		});
	};
}

export const plugins = [registerWidgets()]
