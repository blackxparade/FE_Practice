<template>
   <div style="display: flex; flex-direction: column; gap: 1rem;" >
        <h3 class="title is-3" style="margin-bottom: 0;" data-testid="asset-list-title">{{ title }}</h3>
        <div class="div" style="display: flex; gap: .5rem;">
            <button class="button is-small is-light" @click="openEditListModal(list)">Edit title</button>
            <button class="button is-small is-light is-danger" @click="deleteList(id); refreshList();">Delete list</button>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { List } from 'src/domain';
import { useEditListModalStore } from '../modal-editList/modal-editList.store';
import { useAssetListStore } from '../../asset-list.store';

export default defineComponent({
    props: {
        id: { type: Number, default: 0 },
		title: { type: String, default: "" },
        list: { type: Object as () => List }
    },
	setup(props) {
        const consoleList = () => {
            console.log(props.list)
        }
        const { refreshList, deleteList } = useAssetListStore();
        const { openEditListModal } = useEditListModalStore();
		return { openEditListModal, refreshList, deleteList, consoleList };
	},
});
</script>
