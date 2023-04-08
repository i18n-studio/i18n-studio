<script setup lang="ts">
import { ISidebarItem } from "./SidebarItem.vue";

interface ISidebar {
  model?: ISidebarItem[];
  selected?: string;
}
defineProps<ISidebar>();
defineEmits(["onItemClick"]);
</script>

<template>
  <div class="flex flex-col h-full shadow-sm border-r-2">
    <SidebarItem
      v-for="item in model"
      :label="item.label"
      :selected="selected === item.id"
      @onItemClick="$emit('onItemClick', item.id)"
    ></SidebarItem>
  </div>
</template>
