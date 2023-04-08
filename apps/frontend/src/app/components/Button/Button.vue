<script setup lang="ts">
import { computed } from "vue";

interface IButton {
  label?: string;
  icon?: string;
  title?: string;
}

const props = defineProps<IButton>();

const iconClass = computed(() => {
  return props.label ? "pl-2" : "";
});
</script>

<template>
  <button class="flex items-center px-4 hover:bg-gray-100" :title="title">
    <span v-if="label">{{ label }}</span>
    <font-awesome-icon
      v-if="icon"
      class="cursor-pointer"
      :class="iconClass"
      :icon="`fa-solid ${icon}`"
    />
  </button>
</template>
