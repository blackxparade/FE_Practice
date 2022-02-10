<template>
	<div :id="listId" class="mt-6">
		<h1 class="subtitle">Reactive list with store</h1>

		<div style="display: flex; flex-direction: column; gap: 1rem; margin-top: 1rem;">
			<div v-for="i in itemList" :key="i.item.id" style="display: flex; align-content: center; gap: .75rem;">
				<input
					:id="i.item.id"
					v-model="getEverySelected"
					type="checkbox"
					:value="i"
					:disabled="isDisabled(i.item.id)"
					style="margin-top: 1rem;"
					@click="toggleItemSelection(i.item.id)">
				<label :for="i.item.id">
					<list-item v-bind="i.item" style="cursor: pointer;" />
				</label>
			</div>
		</div>
	</div>
</template>
<script lang="ts">

export type OptionalProps<T, K extends keyof T> = Partial<Pick<T, K>> & Omit<T, K>;

type Item = {
	id: number;
    name: string;
	summary: string;
};

function Item({ name, summary, ...rest }: OptionalProps<Item, 'id'> ): Item {
	return {
		id: Math.floor(Math.random() * 100),
		name,
		summary,
		...rest,
	};
}

import { computed, defineComponent } from 'vue';
import { provideListStore } from '../store/list.store';
import ListItem from './list-item.vue';

export default defineComponent({
	components: {
		ListItem,
	},
	props: {
		isMultiSelect: { type: Boolean, default: false },
	},
	setup(props) {

		// { isSelected: false, item: Item({ name: 'item1', summary: 'summary1' }) },
		// { isSelected: false, item: Item({ name: 'item2', summary: 'summary2' }) },
		// { isSelected: false, item: Item({ name: 'item3', summary: 'summary3' }) },
		// { isSelected: false, item: Item({ name: 'item4', summary: 'summary4' }) },
		// { isSelected: false, item: Item({ name: 'item5', summary: 'summary5' }) },

		const { getSelected, ...rest } = provideListStore();
		const listId = Math.floor(Math.random() * 100);
		const isDisabled = (id: number) => {
			return props.isMultiSelect && getSelected.value !== id;
		};


		return {
			listId,
			isDisabled,
			...rest,
		};
	},
});
</script>
