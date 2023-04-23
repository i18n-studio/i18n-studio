<script setup lang="ts">
import { ITreeViewItem } from './TreeViewItem.vue';

export interface ITreeView {
  model?: ITreeViewItem;
}

defineProps<ITreeView>();
defineEmits(['on-item-toggle']);
</script>

<template>
  <aside class="flex flex-col p-2 h-full w-full">
    <div
      class="flex items-center justify-between p-1 cursor-pointer select-none hover:bg-gray-100"
    >
      <div class="flex items-center">
        <FontAwesomeIcon class="text-sm p-2" icon="fa-solid fa-folder-closed" />
        <span>Ungrouped</span>
      </div>
      <FontAwesomeIcon
        class="p-2"
        icon="fa-solid fa-question-circle"
        title="This folder contains translations, which are not grouped."
      />
    </div>
    <hr />
    <TreeViewItem
      v-for="item in model.children"
      :id="item.id"
      :label="item.label"
      :children="item.children"
    />
  </aside>
</template>
