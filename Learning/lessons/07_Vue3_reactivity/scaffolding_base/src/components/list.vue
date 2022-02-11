<template>
	<div :id="listId" class="mt-6">
		<h1 class="subtitle">Reactive list with store</h1>

		<div style="display: flex; flex-direction: column; gap: 1rem; margin-top: 1rem;">
			<div v-for="item in items" :key="item.id" style="display: flex; align-content: center; gap: .75rem;">
				<input
					:id="item.id"
					:value="item.isSelected"
					type="checkbox"
					:disabled="isDisabled(item.id)"
					style="margin-top: 1rem;"
					@change="setItemSelectionById(item.id, $event.target.checked)">
				<label :for="item.id">
					<list-item v-bind="item" style="cursor: pointer;" />
				</label>
			</div>
		</div>
	</div>
</template>
<script lang="ts">

import { Item } from 'src/domain';
import { defineComponent, toRefs } from 'vue';
import ListItem from './list-item.vue';
import { setupListStore } from './list.store';

export default defineComponent({
	components: {
		ListItem,
	},
	props: {
		isMultiSelect: { type: Boolean, default: false },
	},
	setup(props) {
		const { isMultiSelect } = toRefs(props);
		const sampleItems = [
			Item({ name: 'item1', summary: 'summary1' }),
			Item({ name: 'item2', summary: 'summary2' }),
			Item({ name: 'item3', summary: 'summary3' }),
			Item({ name: 'item4', summary: 'summary4' }),
			Item({ name: 'item5', summary: 'summary5' }),
		];
		const { setItems, ...rest } = setupListStore({ isMultiSelect });
		setItems(sampleItems);

		return {
			...rest,
		};
	},
});
</script>
