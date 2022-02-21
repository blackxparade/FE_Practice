<template>
	<div>
        <div style="display: flex; gap: .5rem;">
            <input class="input" type="text" placeholder="New list title" v-model="listNameInput">
            <button class="button" :disabled="!listNameInput.length" @click="saveNewList()">Add new list</button>
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
import { List } from 'src/domain';
import { provideAssetListsStore } from './asset-lists-container.store';
import AssetListHandler from './asset-list/asset-list-handler.vue';

/* scaffolding-enable */
export default defineComponent({
	/* scaffolding-disable unless keepExamples */
	components: {
		AssetListHandler
	},
    setup() {
        const { getLists, postListToApi } = provideAssetListsStore();
        const listNameInput = ref("");
        const lists = getLists();
        const saveNewList = () => {
            postListToApi(List(listNameInput.value));
            listNameInput.value = "";
        };
        return {
            lists,
            postListToApi,
            listNameInput,
            saveNewList
        }
    }
});
</script>
