<script setup lang="ts">
import { ViewTypeEditor, ViewTypeJson } from './types';

interface Ii18nViewer {
  content?: object;
  isJsonView?: boolean;
}

defineProps<Ii18nViewer>();
defineEmits(['onViewChange']);
</script>
<template>
  <section class="flex flex-col">
    <header class="flex justify-end p-2 text-xs">
      <ButtonGroup>
        <Button
          label="Editor"
          :underline="true"
          @click="$emit('onViewChange', ViewTypeEditor)"
        ></Button>
        <Button
          label="JSON"
          :underline="true"
          @click="$emit('onViewChange', ViewTypeJson)"
        ></Button>
      </ButtonGroup>
    </header>
    <main>
      <pre v-if="content && isJsonView" class="px-4">{{ content }}</pre>
    </main>
  </section>
</template>
