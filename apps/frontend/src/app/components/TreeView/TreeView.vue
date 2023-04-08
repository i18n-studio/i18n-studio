<script setup lang="ts">

import { ITreeViewItem } from "./TreeViewItem.vue";

export interface ITreeView {
  model?: ITreeViewItem;
}

defineProps<ITreeView>();
</script>

<template>
  <aside class="flex flex-col p-2 h-full w-full">
    <TreeViewItem :children="model.children" />
  </aside>
</template>
