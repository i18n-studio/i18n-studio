<script setup lang="ts">
import { RouterView } from 'vue-router';
import { useSocketOn } from './hooks/useSocketOn';
import NotificationItem from './components/NotificationItem.vue';
import { watch } from 'vue';
import NavigationBar from './components/NavigationBar/NavigationBar.vue';

const isOnline = useSocketOn('CONNECT', false, true);

watch(useSocketOn('DISCONNECT'), () => {
  isOnline.value = false;
});
</script>

<template>
  <NotificationItem
    v-if="!isOnline"
    title="Online status"
    text="No connection to adapter established."
    severity="error"
  />
  <section>
    <header>
      <NavigationBar />
    </header>
    <main class="h-screen">
      <RouterView />
    </main>
  </section>
</template>
