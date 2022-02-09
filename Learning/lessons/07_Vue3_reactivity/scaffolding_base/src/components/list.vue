<template>
	<div class="mt-6">
        <h1 class="subtitle">Reactive list with store</h1>

        <div style="display: flex; flex-direction: column; gap: 1rem; margin-top: 1rem;">
            <div v-for="i in itemList" :key="i.item.id" style="display: flex; align-content: center; gap: .75rem;">
                <input
                    :id="i.item.id"
                    v-model="getEverySelected"
                    type="checkbox"
                    :value="i"
                    :disabled="isDisabled(i.item.id)"
                    @click="toggleItemSelection(i.item.id)"
                    style="margin-top: 1rem;">
                <label :for="i.item.id">
                    <list-item v-bind="i.item" style="cursor: pointer;" />
                </label>
            </div>
        </div>
	</div>
</template>
<script lang="ts">

import { defineComponent } from 'vue';
import { useListStore, provideListStore } from '../store/list.store';
import ListItem from './list-item.vue';

export default defineComponent({
    components: {
        ListItem,
    },
    props: {
        isMultiSelect: { type: Boolean, default: false }
    },
    data () {
        return {
        id: null
        }
    }, 
	setup() {
        return {
            ...useListStore(),
            ...provideListStore()
        }
    },
    
    methods: {
        initSelectability() {
            this.setSelectability(this.isMultiSelect);
        },

        isDisabled(id: number) {
            if (!this.isMultiSelectable && 
            this.getEverySelected.length > 0 && 
            this.getSelected!.item.id != id) {
                return true
            } else {
                return false
            }
        }
    },

    mounted() {
        this.initSelectability();
    },

});
</script>
