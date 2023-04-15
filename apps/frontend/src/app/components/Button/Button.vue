<script setup lang="ts">
import { computed } from 'vue';

interface IButton {
  label?: string;
  icon?: string;
  title?: string;
  isDisabled?: boolean;
  badgeVisible?: boolean;
  badgeText?: number;
  underline?: boolean;
}

const props = defineProps<IButton>();
defineEmits(['onClick']);

const iconClass = computed(() => {
  return props.label ? 'pl-2' : '';
});

const buttonLabelClass = computed(() => {
  return {
    underline: props.underline,
  };
});
</script>

<template>
  <button
    class="flex items-center px-4 disabled:text-gray-400 enabled:hover:bg-gray-100 disabled:cursor-default"
    :title="title"
    :disabled="isDisabled"
    @click="$emit('onClick')"
  >
    <span v-if="label" :class="buttonLabelClass">{{ label }}</span>

    <div class="relative">
      <FontAwesomeIcon
        v-if="icon"
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
