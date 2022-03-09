<template>
	<div>
        <div style="display: flex; gap: .5rem;">
            <input class="input" type="text" placeholder="New list title" v-model="listNameInput">
            <button class="button" :disabled="!listNameInput.length" @click="saveList(listNameInput)">Add new list</button>
        </div>


        <div style="display: flex; flex-wrap: wrap; gap: 4rem;">
            <div v-for="list in lists" :key="list.id">
                <asset-list-handler v-bind="list" />
            </div>
        </div>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { provideAssetListsStore } from './asset-lists.store';
import AssetListHandler from './asset-list/asset-list-handler.vue';
import { useApi } from 'src/api';

/* scaffolding-enable */
export default defineComponent({
	/* scaffolding-disable unless keepExamples */
	components: {
		AssetListHandler
	},
    setup() {
		const api = useApi();
        const { lists, getListsFromApi, saveNewList, listNameInput, resetInputValue } = provideAssetListsStore({ api });
        getListsFromApi();

		const saveList = (title: string) => {
			saveNewList(title).then(() => {
				resetInputValue();
			})
		};
        return {
            lists,
            listNameInput,
            saveList,
        }
    }
});
</script>
