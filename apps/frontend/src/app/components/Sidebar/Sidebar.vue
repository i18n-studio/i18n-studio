<script setup lang="ts">
import { ISidebarItem } from './SidebarItem.vue';

interface ISidebar {
  model?: ISidebarItem[];
  selected?: string;
}
defineProps<ISidebar>();
defineEmits(['onItemClick']);
</script>

<template>
  <div class="flex flex-col h-full shadow-sm border-r-2 select-none">
    <SidebarItem
      v-for="item in model"
      :key="item.id"
      :label="item.label"
      :selected="selected === item.id"
      @on-item-click="$emit('onItemClick', item.id)"
    ></SidebarItem>
  </div>
</template>
