<script setup lang="ts">
import { RouterView } from 'vue-router';
import { useSocketOn } from './hooks/useSocketOn/useSocketOn';
import NotificationItem from './components/NotificationItem.vue';
import { watch } from 'vue';
import NavigationBar from './components/NavigationBar/NavigationBar.vue';
import { SocketEvents } from './socket.event';
import { HttpStatus } from '@nestjs/common';

const isConnected = useSocketOn(SocketEvents.CONNECT, true, true);

watch(useSocketOn(SocketEvents.DISCONNECT), () => {
  isConnected.value = {
    statusCode: HttpStatus.NOT_FOUND,
    data: false,
  };
});
</script>

<template>
  <NotificationItem
    v-if="!isConnected.data"
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
