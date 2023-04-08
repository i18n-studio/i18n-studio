<script setup lang="ts">
export interface ISidebarItem {
  label?: string;
  id?: string;
  selected?: boolean;
}

defineProps<ISidebarItem>();
defineEmits(["onItemClick"]);
</script>

<template>
  <div
    class="flex justify-center items-center aspect-square w-14 cursor-pointer hover:bg-gray-100"
    :class="selected ? 'bg-gray-100' : null"
    @click="$emit('onItemClick')"
  >
    <span class="uppercase font-bold">{{ label }}</span>
  </div>
</template>
