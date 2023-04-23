<script setup lang="ts">
import { computed, ref } from 'vue';

export interface ITreeViewItem {
  id?: string;
  label?: string;
  children?: ITreeViewItem[];
}

const props = defineProps<ITreeViewItem>();

const isOpen = ref(false);
const isDeep = computed<boolean>(() => {
  if (props.children) {
    return (
      props.children
        ?.flat()
        .filter((child) => child.children)
        .filter((child) => typeof child === 'object')?.length > 0
    );
  }
  return false;
});
</script>

<template>
  <div class="flex flex-col cursor-pointer">
    <div
      v-if="children"
      class="flex items-center px-1 py-2 select-none hover:bg-gray-100"
      :class="{
        'bg-gray-100': isOpen,
      }"
      @click="isOpen = !isOpen"
    >
      <FontAwesomeIcon
        v-if="isDeep"
        class="text-xs p-2"
        :icon="isOpen ? 'fa-solid fa-caret-down' : 'fa-solid fa-caret-right'"
      />
      <FontAwesomeIcon
        class="text-sm p-2"
        :icon="isOpen ? 'fa-solid fa-folder-open' : 'fa-solid fa-folder-closed'"
      />

      <span v-if="isDeep">
        {{ label }}
      </span>
      <span v-if="!isDeep" class="ml-4">{{ label }}</span>
      <span
        class="flex justify-center items-center aspect-square w-5 text-xs ml-2 bg-black text-white rounded-xl"
        >{{ children.length }}</span
      >
    </div>

    <div v-if="isOpen && children" class="ml-4">
      <TreeViewItem
        v-for="item in children"
        :key="item.id"
        :id="item.id"
        :label="item.label"
        :children="item.children"
      />
    </div>
  </div>
</template>
