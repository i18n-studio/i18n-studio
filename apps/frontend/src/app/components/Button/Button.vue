<script setup lang="ts">
import { computed } from 'vue';

interface IButton {
  label?: string;
  icon?: string;
  title?: string;
  badgeVisible?: boolean;
  badgeText?: number;
}

const props = defineProps<IButton>();

const iconClass = computed(() => {
  return props.label ? 'pl-2' : '';
});
</script>

<template>
  <button class="flex items-center px-4 hover:bg-gray-100" :title="title">
    <span v-if="label">{{ label }}</span>

    <div class="relative">
      <font-awesome-icon
        v-if="icon"
        class="cursor-pointer"
        :class="iconClass"
        :icon="`fa-solid ${icon}`"
      />
      <span
        v-if="badgeText"
        class="absolute -top-1 left-2 flex justify-center items-center bg-black w-4 aspect-square rounded-full text-xs text-white"
        >{{ badgeText }}
      </span>
    </div>
  </button>
</template>
