<script setup lang="ts">
import { ViewTypeEditor, ViewTypeJson } from './types';
import JsonView from './JsonView.vue';

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
    <main v-if="content" class="m-4 shadow-sm border">
      <JsonView :json="content" />
      <!--      <pre v-if="content && isJsonView" class="px-4">{{ content }}</pre>-->
    </main>
  </section>
</template>
