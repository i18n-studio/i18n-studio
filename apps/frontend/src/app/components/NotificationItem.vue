<script setup lang="ts">
import { Severity } from '../models/types';
import { computed } from 'vue';

interface INotification {
  title?: string;
  text?: string;
  severity?: Severity;
}

const props = withDefaults(defineProps<INotification>(), {
  title: '',
  text: '',
  severity: 'default',
});

const style = computed(() => {
  if (props.severity === 'default') {
    return 'bg-white';
  }
  if (props.severity === 'error') {
    return 'bg-danger border-danger-darker text-white';
  }
  return '';
});
</script>

<template>
  <section class="border-1 border p-2" :class="style">
    <span v-if="title" class="font-bold">{{ title }}</span>
    <article v-if="text">{{ text }}</article>
  </section>
</template>
