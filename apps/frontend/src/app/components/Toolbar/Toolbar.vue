<script setup lang="ts">
import NotificationItem from '../NotificationItem.vue';
import { ref } from 'vue';

const isNotificationVisible = ref(false);
</script>

<template>
  <div class="relative">
    <section class="flex items-center justify-between border-b-2">
      <ButtonGroup>
        <Button class="border-r-2" icon="fa-add" title="add translation" />
        <Button
          class="border-r-2"
          icon="fa-file-circle-check"
          title="analyze files"
        />
        <Button class="border-r-2" icon="fa-undo" title="undo" />
        <Button class="border-r-2" icon="fa-redo" title="redo" />
      </ButtonGroup>
      <ButtonGroup
        class="border-l-2"
        @click="isNotificationVisible = !isNotificationVisible"
      >
        <Button icon="fa-bell" title="analyzer" />
      </ButtonGroup>
    </section>
    <section
      v-if="isNotificationVisible"
      class="absolute border border-2 right-0 bg-white shadow-md w-64 rounded-md overflow-hidden"
    >
      <header
        class="flex justify-between items-center border-b-2 mb-2 pl-2 h-12"
      >
        <span class="font-bold">Notifications</span>

        <ButtonGroup>
          <Button icon="fa-sliders" />
        </ButtonGroup>
      </header>
      <main class="p-2 my-2">
        <NotificationItem
          class="mb-1"
          title="Missing translation in it.json"
          text="Translation for »colors.blue« is not defined."
        />
        <NotificationItem
          class="mb-1"
          title="Missing translation in it.json"
          text="Translation for »colors.blue« is not defined."
        />
        <NotificationItem
          class="mb-1"
          title="Missing translation in it.json"
          text="Translation for »colors.blue« is not defined."
        />
      </main>
    </section>
  </div>
</template>
