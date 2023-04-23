<script setup lang="ts">
import { ref } from 'vue';

interface IJsonView {
  json?: object;
}

interface JsonLine {
  key: string;
  value: string;
}

const selectedLineIndex = ref<number | undefined>(undefined);

defineProps<IJsonView>();

function generateJsonLines(content: { [key: string]: object }): JsonLine[] {
  const keys = Object.keys(content);
  return keys
    .map((key) => {
      if (typeof content[key] === 'object') {
        return generateJsonLines(content[key]);
      }
      return {
        key,
        value: content[key],
      };
    })
    .flat() as JsonLine[];
}

function getSelectedLineStyling(index: number) {
  return {
    'bg-black': selectedLineIndex.value === index,
    'text-white': selectedLineIndex.value === index,
  };
}
</script>

<template>
  <section v-if="json" class="flex flex-col bg-white">
    <main
      v-for="(jsonLine, index) in generateJsonLines(json)"
      :key="jsonLine.key"
      class="flex items-center h-8"
      @focusout="selectedLineIndex = undefined"
    >
      <span
        class="w-24 outline-none p-2"
        :class="getSelectedLineStyling(index)"
      >
        {{ jsonLine.key }}
      </span>
      <span
        contenteditable
        class="w-full ml-3 outline-none p-1 focus:bg-gray-100 focus:italic"
        @focus="selectedLineIndex = index"
      >
        {{ jsonLine.value }}
      </span>
    </main>
  </section>
</template>
