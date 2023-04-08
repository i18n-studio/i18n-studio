<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

interface IInput {
  placeholder?: string;
}

defineProps<IInput>();
</script>

<template>
  <div
    class="flex flex-row items-center w-full relative bg-gray-100 border-b-2 border-gray-500"
  >
    <font-awesome-icon
      class="pl-2 pr-1"
      icon="fa-solid fa-search"
    ></font-awesome-icon>
    <input
      class="w-full p-2 bg-inherit outline-none"
      :placeholder="placeholder"
    />
  </div>
</template>
