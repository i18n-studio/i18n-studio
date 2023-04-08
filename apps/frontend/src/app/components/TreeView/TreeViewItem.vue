<script setup lang="ts">
import type { ITreeView } from "@/components/TreeView/TreeView.vue";

export interface ITreeViewItem {
  label?: string;
  isCollapsible?: boolean;
  isOpen?: boolean;
  children?: ITreeViewItem[];
}

defineProps<ITreeViewItem>();
</script>

<template>
  <div class="flex flex-col cursor-pointer">
    <div v-if="children !== null">
      <TreeViewItem
        v-for="child in children"
        :key="child.label"
        :label="child.label"
        :is-collapsible="child.isCollapsible"
        :children="child.children"
      />
    </div>
    <div v-if="label" class="flex items-center">
      <font-awesome-icon
        v-if="isCollapsible"
        class="p-3 hover:bg-gray-100"
        :icon="
          isOpen ? 'fa-solid fa-chevron-down' : 'fa-solid fa-chevron-right'
        "
      />
      <span class="p-2 w-full hover:bg-gray-100">{{ label }}</span>
    </div>
  </div>
</template>
