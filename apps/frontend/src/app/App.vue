<script setup lang="ts">
import { RouterView } from 'vue-router';
import { useSocketOn } from './hooks/useSocketOn';
import Notification from './components/Notification.vue';
import { watch } from 'vue';

const isOnline = useSocketOn('CONNECT', false, true);

watch(useSocketOn('DISCONNECT'), () => {
  isOnline.value = false;
});
</script>

<template>
  <Notification
    v-if="!isOnline"
    title="Online status"
    text="No connection to adapter established."
    severity="error"
  />
  <section>
    <header>
      <nav class="flex items-center bg-black text-white h-16 p-4">
        <h1 class="font-thin text-3xl uppercase p-0 m-0">i18n-Studio</h1>
      </nav>
    </header>
    <main>
      <RouterView />
    </main>
  </section>
</template>
